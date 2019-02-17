import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-graph';

const BigNumber = require('bignumber.js');
const contractAbi =  [{"constant":false,"inputs":[],"name":"splash","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"myDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"poolSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stateOfPool","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"poolReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_stateVar","type":"uint256"}],"name":"setState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"saver","type":"address"},{"indexed":false,"name":"deposit","type":"uint256"}],"name":"Splash","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"saver","type":"address"},{"indexed":false,"name":"savings","type":"uint256"}],"name":"Withdraw","type":"event"}];

// FETCH POOL STATUS

export const fetchPoolState = (web3) => {
    return dispatch => {
        web3.eth.call({
                to: process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS,
                data: '0x7b9e152e'}) // stateOfPool()
            .then((poolState) => {
                // calculate time from block
                console.log(poolState);
                dispatch(fetchPoolStateSuccess("0"));
            }).catch((error) => {
                dispatch(fetchPoolStateFailed(error))
            });
    }
}

export const fetchPoolStateSuccess = (time) => {
    return {
		type: actionTypes.FETCH_POOL_STATE_SUCCESS,
		timeStopSplash: time
	};
}

export const fetchPoolStateFailed = (error) => {
    return {
		type: actionTypes.FETCH_POOL_STATE_FAILED,
		error: error
	};
}

// GET TIME TO STOP ALLOWING PARTICIPANTS TO SPLASH

export const fetchTimeStopSplash = (web3) => {
    return dispatch => {
        web3.eth.call({
                to: process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS,
                data: '0x4ec18db9'}) // poolSize()
            .then((splashEndBlock) => {
                // calculate time from block
                // console.log(splashEndBlock);
                dispatch(fetchTimeStopSplashSuccess("5"));
            }).catch((error) => {
                dispatch(fetchTimeStopSplashFailed(error))
            });
    }
}

export const fetchTimeStopSplashSuccess = (time) => {
    return {
		type: actionTypes.FETCH_TIME_STOP_SPLASH_SUCCESS,
		timeStopSplash: time
	};
}

export const fetchTimeStopSplashFailed = (error) => {
    return {
		type: actionTypes.FETCH_TIME_STOP_SPLASH_FAILED,
		error: error
	};
}

// GET CURRENT LOTTERY POT

export const fetchCurrentPool = (web3) => {
    return dispatch => {
        web3.eth.call({
                to: process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS,
                data: '0x4ec18db9'}) // poolSize()
            .then((poolSize) => {
                // adjust pool size?
                poolSize = web3.utils.fromWei(web3.eth.abi.decodeParameter('uint256', poolSize), 'ether');
                dispatch(fetchCurrentPoolSuccess(poolSize));
            }).catch((error) => {
                dispatch(fetchCurrentPoolFailed(error));
            });
    }
}

export const fetchCurrentPoolSuccess = (pool) => {
    return {
		type: actionTypes.FETCH_CURRENT_POOL_SUCCESS,
		currentPool: pool
	};
}

export const fetchCurrentPoolFailed = (error) => {
    return {
		type: actionTypes.FETCH_CURRENT_POOL_FAILED,
		error: error
	};
}

// GET ENTER POOL

export const enterPool = (web3, entryAmount) => {
    return dispatch => {
        const contractAddress = process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS;
        const value = web3.utils.toWei(entryAmount, 'finney')
        web3.eth.getAccounts().then((accounts) => {
            web3.eth.sendTransaction({
                value: value,
                from: accounts[0],
                to: contractAddress,
                data: '0x12f4d4aa' // splash()
            })
                .once('transactionHash', (hash) => { console.log(hash); })
                .once('receipt', (receipt) => { 
                    console.log(receipt); 
                    dispatch(enterPoolSuccess());
                });
        });
        console.log("enter!");
    }
}

export const enterPoolSuccess = () => {
    return {
		type: actionTypes.ENTER_POOL_SUCCESS,
	};
}

export const enterPoolFailed = (error) => {
    return {
		type: actionTypes.ENTER_POOL_FAILED,
		error: error
	};
}

// GET FETCH ENTRIES

export const fetchEntries = (web3, account) => {
    return dispatch => {
        web3.eth.call({
            to: process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS,
            data: '0x2a096397'}) // myDeposit()
            // data: web3.eth.abi.encodeParameter("string", "myDeposit()")}) // myDeposit()
        .then((deposit) => {
            let myDeposit = web3.utils.fromWei(web3.eth.abi.decodeParameter('uint256', deposit), 'ether');
            dispatch(fetchEntriesSuccess(myDeposit));
        }).catch((error) => {
            dispatch(fetchEntriesFailed(error));
        });
    }
}

export const fetchEntriesSuccess = (entries) => {
    return {
        type: actionTypes.FETCH_ENTRIES_SUCCESS,
        entries: entries
	};
}

export const fetchEntriesFailed = (error) => {
    return {
		type: actionTypes.FETCH_ENTRIES_FAILED,
		error: error
	};
}

// GET CURRENT APR

export const fetchCurrentApr = (web3, account) => {
    return dispatch => {
        
        const graph_query = `{ 
            market(id: "${process.env.REACT_APP_DAI_CONTRACT_ADDRESS}") {
                id
                assetName
                supplyRateMantissa
                isSuspended
            }
        }`
        
        axios.post('', {query: graph_query})
            .then((data) => {
                let supplyRateMantissa = data.data.data.market.supplyRateMantissa;
                const baseTen = new BigNumber(10);
                let Apr = 100 * supplyRateMantissa * 2102400 * baseTen.exponentiatedBy(-18);
                dispatch(fetchCurrentAprSuccess(Apr));
            }).catch((error) => {
                dispatch(fetchCurrentAprFailed(error));
            });

    }
}

export const fetchCurrentAprSuccess = (apr) => {
    return {
        type: actionTypes.FETCH_CURRENT_APR_SUCCESS,
        currentApr: apr
	};
}

export const fetchCurrentAprFailed = (error) => {
    return {
		type: actionTypes.FETCH_CURRENT_APR_FAILED,
		error: error
	};
}

