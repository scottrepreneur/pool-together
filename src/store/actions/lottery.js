import * as actionTypes from './actionTypes';


// GET ACCOUNT INFO FROM FORTMATIC

export const fetchAccountInfo = (web3, fm) => {
    return dispatch => {
		let _accountInfo = {};
		// Get user address
		web3.eth.getAccounts()
			.then((accounts) => {
				let address = accounts[0];
				_accountInfo['address'] = address;
				})
			.catch((err) => {
				dispatch(fetchAccountInfoFailed(err));
			});

		// Get user balance (includes ERC20 tokens as well)
		fm.user.getBalances()
			.then((balances) => {
				let ethBalance = balances.find((e) => {
					return e.crypto_currency === 'ETH';
				});
				_accountInfo['balance'] = ethBalance.crypto_amount_display + ' ETH';
			})
			.catch((err) => {
				dispatch(fetchAccountInfoFailed(err));
			});
		
        dispatch(fetchAccountInfoSuccess(_accountInfo));
    }
}

export const fetchAccountInfoSuccess = (account) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_INFO_SUCCESS,
		accountInfo: account
    }
}

export const fetchAccountInfoFailed = (error) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_INFO_FAILED,
		error: error
    }
}

// GET LOTTERY INFO

export const fetchLotteryInfo = () => {
    return dispatch => {
        dispatch(fetchLotteryInfoSuccess("FAKE_LOTTERY_DATA"));
    }
}

export const fetchLotteryInfoSuccess = (lotteryInfo) => {
    return {
		type: actionTypes.FETCH_LOTTERY_INFO_SUCCESS,
		lotteryInfo: lotteryInfo
	};
}

export const fetchLotteryInfoFailed = (error) => {
    return {
		type: actionTypes.FETCH_LOTTERY_INFO_FAILED,
		error: error
	};
}