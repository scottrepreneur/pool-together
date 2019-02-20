import * as actionTypes from './actionTypes';

const BigNumber = require('bignumber.js');

const daiAddress = process.env.REACT_APP_DAI_CONTRACT_ADDRESS
const daiAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

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

		const dai = new web3.eth.Contract(daiAbi, daiAddress);
	   
		web3.eth.getAccounts().then((accounts) => {
			dai.methods.balanceOf(accounts[0]).call()
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
		web3.eth.net.getId()
			.then((network) => {
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
