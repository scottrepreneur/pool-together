import * as actionTypes from './actionTypes';

const BigNumber = require('bignumber.js');

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

export const fetchBalance = (web3, address) => {
	return dispatch => {
		// their balances call isn't returning the token balance for some reason
		// Get user balance (includes ERC20 tokens as well)
		// fm.user.getBalances()
		// 	.then((balances) => {
		// 		// Was ETH balance
		// 		let ethBalance = balances.find((e) => {
		// 			return e.crypto_currency === 'ETH';
		// 		});
		// 		let balance = ethBalance.crypto_amount_display + ' ETH';
		// 		// Need Dai balance
		// 		let theBalance = 0;
		// 		for (var i=0; i<balances.length; i++) {
		// 			console.log(balances[i].crypto_currency)
		// 			if (balances[i].contract_address === process.env.REACT_APP_DAI_CONTRACT_ADDRESS) {
		// 				theBalance = balances[i].crypto_amount_display;
		// 			}
		// 		}
		// 		console.log(theBalance + ' Dai');
		// 		dispatch(fetchBalanceSuccess(balances));
		// 	})
		// 	.catch((err) => {
		// 		dispatch(fetchBalanceFailed(err));
		// 	});
	   
		web3.eth.getAccounts().then((accounts) => {
			let account = accounts[0].substring(2); // strip 0x from beginning	
			let data = ('0x70a08231000000000000000000000000' + account);
			
			web3.eth.call({
				to: process.env.REACT_APP_DAI_CONTRACT_ADDRESS,
				data: data}) // balanceOf('address')
				.then((balance) => {
					balance = web3.utils.hexToNumberString(balance);
					let baseTen = new BigNumber(10)
					balance = balance * baseTen.exponentiatedBy(-18);
					dispatch(fetchBalanceSuccess(balance));
				})
				.catch((error) => {
					dispatch(fetchBalanceFailed(error));
				});
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

// GET CURRENT NETWORK

export const fetchNetwork = (web3) => {
	return dispatch => {
		// GetNetworkType is not supported by Fortmatic yet
		// web3.eth.net.getNetworkType()
		
		// Get network id
		web3.eth.net.getId()
			.then((network) => {
				console.log(network);
				dispatch(fetchNetworkSuccess(network));
			})
			.catch((err) => {
				dispatch(fetchNetworkFailed(err));
			});
	}
}

export const fetchNetworkSuccess = (network) => {
    return {
        type: actionTypes.FETCH_NETWORK_SUCCESS,
		network: network
    }
}

export const fetchNetworkFailed = (error) => {
    return {
        type: actionTypes.FETCH_NETWORK_FAILED,
		error: error
    }
}
