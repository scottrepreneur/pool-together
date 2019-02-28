import * as actionTypes from './actionTypes';

const BigNumber = require('bignumber.js');

const daiAbi = require('../../eth/contracts/Dai.js');
const daiAddress = process.env.REACT_APP_DAI_CONTRACT_ADDRESS

// GET USER ADDRESS

export const fetchAddress = (web3) => {
    return dispatch => {
		web3.eth.getAccounts()
			.then((accounts) => {
				let address = accounts[0];
				console.log(accounts);
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

// USER HAS WEB3 BUT IS NOT LOGGED IN (TRIGGER METAMASK)



// GET USER ETHER BALANCE

export const fetchEthBalance = (web3, address) => {
	return dispatch => {
		web3.eth.getAccounts().then((accounts) => {
			web3.eth.getBalance(accounts[0])
				.then((balance) => {
					balance = web3.utils.hexToNumberString(balance);
					let baseTen = new BigNumber(10)
					balance = balance * baseTen.exponentiatedBy(-18);
					dispatch(fetchEthBalanceSuccess(balance));
				})
				.catch((error) => {
					dispatch(fetchEthBalanceFailed(error));
				});
			});
	}
}

export const fetchEthBalanceSuccess = (balance) => {
    return {
        type: actionTypes.FETCH_ETH_BALANCE_SUCCESS,
		balance: balance
    }
}

export const fetchEthBalanceFailed = (error) => {
    return {
        type: actionTypes.FETCH_ETH_BALANCE_FAILED,
		error: error
    }
}

// GET USER DAI BALANCE

export const fetchDaiBalance = (web3, address) => {
	return dispatch => {
		const dai = new web3.eth.Contract(daiAbi, daiAddress);
	   
		web3.eth.getAccounts().then((accounts) => {
			dai.methods.balanceOf(accounts[0]).call()
				.then((balance) => {
					balance = web3.utils.hexToNumberString(balance);
					let baseTen = new BigNumber(10)
					balance = balance * baseTen.exponentiatedBy(-18);
					dispatch(fetchDaiBalanceSuccess(balance));
				})
				.catch((error) => {
					dispatch(fetchDaiBalanceFailed(error));
				});
			});
	}
}

export const fetchDaiBalanceSuccess = (balance) => {
    return {
        type: actionTypes.FETCH_DAI_BALANCE_SUCCESS,
		balance: balance
    }
}

export const fetchDaiBalanceFailed = (error) => {
    return {
        type: actionTypes.FETCH_DAI_BALANCE_FAILED,
		error: error
    }
}

// GET CURRENT NETWORK

export const fetchNetwork = (web3) => {
	return dispatch => {
		web3.eth.getAccounts().then((accounts) => {		
			web3.eth.net.getId()
				.then((network) => {
					dispatch(fetchNetworkSuccess(network));
				})
				.catch((err) => {
					dispatch(fetchNetworkFailed(err));
				});
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
