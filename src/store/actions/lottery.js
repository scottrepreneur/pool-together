import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-graph';

const BigNumber = require('bignumber.js');

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

// GET CURRENT LOTTERY POOL

export const fetchCurrentPool = (web3) => {
    return dispatch => {
        web3.eth.call({
                to: process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS,
                data: '0x4ec18db9'}) // poolSize()
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
        web3.eth.getAccounts().then((accounts) => {
            let account = accounts[0].substring(2);
            let data = ('0xde242ff4000000000000000000000000' + account);

            web3.eth.call({
				to: process.env.REACT_APP_DAI_CONTRACT_ADDRESS,
				data: data})
				.then((allowance) => {
                    console.log(allowance);
					allowance = web3.utils.hexToNumberString(allowance);
					let baseTen = new BigNumber(10)
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
		const erc20TokenContractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

        // Instantiate contract
        const tokenContract = new web3.eth.Contract(erc20TokenContractAbi, process.env.REACT_APP_DAI_CONTRACT_ADDRESS);

        // Calculate contract compatible value for approve with proper decimal points using BigNumber
        const tokenDecimals = web3.utils.toBN(18);
        const tokenAmountToApprove = web3.utils.toBN(999000000000);
        const calculatedApproveValue = web3.utils.toHex(tokenAmountToApprove.mul(web3.utils.toBN(10).pow(tokenDecimals)));

        // Get user account wallet address first
        web3.eth.getAccounts().then((accounts) => {
        // Send ERC20 transaction with web3
            tokenContract.methods.approve(
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

