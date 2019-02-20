import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-graph';

const BigNumber = require('bignumber.js');
let baseTen = new BigNumber(10)

const lotteryAddress = process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS
const lotteryAbi = [{"constant":false,"inputs":[],"name":"splash","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"myDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"poolSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stateOfPool","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"entryData","outputs":[{"name":"Entries","type":"uint256"},{"name":"Size","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"poolReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amtDai","type":"uint256"}],"name":"splashDai","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_stateVar","type":"uint256"}],"name":"setState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawDai","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"entrants","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"daisend","type":"uint256"}],"name":"earnInterest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"daiAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"saver","type":"address"},{"indexed":false,"name":"deposit","type":"uint256"},{"indexed":false,"name":"total","type":"uint256"}],"name":"splashDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"saver","type":"address"},{"indexed":false,"name":"savings","type":"uint256"}],"name":"takeHome","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"state","type":"uint8"}],"name":"Saving","type":"event"}]

const daiAddress = process.env.REACT_APP_DAI_CONTRACT_ADDRESS
const daiAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

// FETCH POOL STATUS

export const fetchPoolState = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);
        lottery.methods.stateOfPool().call()
            .then((poolState) => {
                dispatch(fetchPoolStateSuccess(poolState));
            }).catch((error) => {
                dispatch(fetchPoolStateFailed(error))
            });
    }
}

export const fetchPoolStateSuccess = (state) => {
    return {
		type: actionTypes.FETCH_POOL_STATE_SUCCESS,
		poolState: state
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

// GET CURRENT LOTTERY POOL

export const fetchCurrentPool = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);
        lottery.methods.poolSize().call()
            .then((poolSize) => {
                // adjust pool size?
                poolSize = Number(web3.utils.fromWei(web3.eth.abi.decodeParameter('uint256', poolSize), 'ether'));
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

// CHECK DAI ALLOWANCE FOR ADDRESS

export const checkDaiAllowance = (web3) => {
    return dispatch => {
        const dai = new web3.eth.Contract(daiAbi, daiAddress);
        
        web3.eth.getAccounts().then((accounts) => {
            dai.methods.allowance(
                accounts[0],
                process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS
            ).call()
				.then((allowance) => {
                    console.log(allowance);
					allowance = web3.utils.hexToNumberString(allowance);
					
					allowance = allowance * baseTen.exponentiatedBy(-18);
					dispatch(checkDaiAllowanceSuccess(allowance));
				})
				.catch((error) => {
					dispatch(checkDaiAllowanceFailed(error));
                });
        });
	};
}

export const checkDaiAllowanceSuccess = (allowance) => {
    return {
        type: actionTypes.CHECK_DAI_ALLOWANCE_SUCCESS,
        allowance: allowance
	};
}

export const checkDaiAllowanceFailed = (error) => {
    return {
		type: actionTypes.CHECK_DAI_ALLOWANCE_FAILED,
		error: error
	};
}

// APPROVE CONTRACT TO TRANSFERFROM DAI FOR ADDRESS

export const approveDai = (web3) => {
    return dispatch => {
		const dai = new web3.eth.Contract(daiAbi, daiAddress);

        // Calculate contract compatible value for approve with proper decimal points using BigNumber
        const tokenDecimals = web3.utils.toBN(18);
        const tokenAmountToApprove = web3.utils.toBN(999000000000);
        const calculatedApproveValue = web3.utils.toHex(tokenAmountToApprove.mul(web3.utils.toBN(10).pow(tokenDecimals)));

        // Get user account wallet address first
        web3.eth.getAccounts().then((accounts) => {
        // Send ERC20 transaction with web3
            dai.methods.approve(
                process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS, 
                calculatedApproveValue
            ).send({from: accounts[0]})
                .then(() => {
                    dispatch(approveDaiSuccess());
                })
                .catch(() => {
                    dispatch(approveDaiFailed());
                })
        });
	};
}

export const approveDaiSuccess = () => {
    return {
		type: actionTypes.APPROVE_DAI_SUCCESS
	};
}

export const approveDaiFailed = (error) => {
    return {
		type: actionTypes.APPROVE_DAI_FAILED,
		error: error
	};
}

// ENTER POOL WITH ETHER

export const enterEthPool = (web3, entryAmount) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);
        const value = web3.utils.toWei(entryAmount, 'finney')
        web3.eth.getAccounts().then((accounts) => {
            lottery.methods.splash().send({
                value: value,
                from: accounts[0],
            })
                .once('transactionHash', (hash) => { console.log(hash); })
                .once('receipt', (receipt) => { 
                    console.log(receipt); 
                    dispatch(enterPoolSuccess());
                    console.log("enter!");
                });
        });
        
    }
}

// ENTER POOL WITH DAI

export const enterDaiPool = (web3, entryAmount) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);
        web3.eth.getAccounts().then((accounts) => {
            lottery.methods.splashDai(entryAmount * baseTen.exponentiatedBy(18)).send({
                from: accounts[0],
            })
                .once('transactionHash', (hash) => { console.log(hash); })
                .once('receipt', (receipt) => { 
                    console.log(receipt); 
                    dispatch(enterPoolSuccess());
                    console.log("enter!");
                });
        });
        
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
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);
        lottery.methods.myDeposit().call()
        .then((deposit) => {
            let myDeposit = web3.utils.fromWei(web3.eth.abi.decodeParameter('uint256', deposit), 'finney');
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

export const fetchCurrentApr = () => {
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

