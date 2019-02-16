import * as actionTypes from './actionTypes';


// GET USER ADDRESS

export const fetchAddress = (web3) => {
    return dispatch => {
		web3.eth.getAccounts()
			.then((accounts) => {
				let address = accounts[0];
				dispatch(fetchAddressSuccess(address));
				})
			.catch((err) => {
				dispatch(fetchAddressFailed(err));
			});
    }
}

export const fetchAddressSuccess = (address) => {
    return {
        type: actionTypes.FETCH_ADDRESS_SUCCESS,
		address: address
    }
}

export const fetchAddressFailed = (error) => {
    return {
        type: actionTypes.FETCH_ADDRESS_FAILED,
		error: error
    }
}

// GET USER BALANCE

export const fetchBalance = (fm) => {
	return dispatch => {
		// Get user balance (includes ERC20 tokens as well)
		fm.user.getBalances()
			.then((balances) => {
				let ethBalance = balances.find((e) => {
					return e.crypto_currency === 'ETH';
				});
				let balance = ethBalance.crypto_amount_display + ' ETH';
				dispatch(fetchBalanceSuccess(balance));
			})
			.catch((err) => {
				dispatch(fetchBalanceFailed(err));
			});
	}
}

export const fetchBalanceSuccess = (balance) => {
    return {
        type: actionTypes.FETCH_BALANCE_SUCCESS,
		balance: balance
    }
}

export const fetchBalanceFailed = (error) => {
    return {
        type: actionTypes.FETCH_BALANCE_FAILED,
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