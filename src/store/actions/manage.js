import * as actionTypes from './actionTypes';

const lotteryAbi = require('../../eth/contracts/PoolTogether.js');
const lotteryAddress = process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS

export const fetchManager = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);

		web3.eth.getAccounts().then((accounts) => {
            lottery.methods.owner().call().then((manager) => {
                dispatch(fetchManagerSuccess(manager));
            })
			.catch((err) => {
				dispatch(fetchManagerFailed(err));
            });
        });
    }
}

export const fetchManagerSuccess = (manager) => {
    return {
        type: actionTypes.FETCH_MANAGER_SUCCESS,
        manager: manager
    }
}

export const fetchManagerFailed = (error) => {
    return {
        type: actionTypes.FETCH_MANAGER_FAILED,
		error: error
    }
}

// PICK WINNER
export const pickWinner = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);

		web3.eth.getAccounts().then((accounts) => {
            lottery.methods.pickWinner().send({
                    'from': accounts[0]
                })
                dispatch(pickWinnerSuccess());
			})
			.catch((err) => {
				dispatch(pickWinnerFailed(err));
			});
    }
}

export const pickWinnerSuccess = () => {
    return {
        type: actionTypes.PICK_WINNER_SUCCESS
    }
}

export const pickWinnerFailed = (error) => {
    return {
        type: actionTypes.PICK_WINNER_FAILED,
		error: error
    }
}

// GET WINNER?

// SUPPLY COMPOUND FINANCE
export const earnInterest = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);

		web3.eth.getAccounts().then((accounts) => {
            lottery.methods.poolSize().call()
            .then((poolSize) => {
                console.log('earn interest')
                lottery.methods.earnInterest(poolSize).send({
                        'from': accounts[0]
                    })
                })
                .then(() => {
                    dispatch(earnInterestSuccess());
                })
                .catch((err) => {
                    dispatch(earnInterestFailed(err));
                });
            })
            
    }
}

export const earnInterestSuccess = () => {
    return {
        type: actionTypes.EARN_INTEREST_SUCCESS
    }
}

export const earnInterestFailed = (error) => {
    return {
        type: actionTypes.EARN_INTEREST_FAILED,
		error: error
    }
}

// GET COMPOUND SUPPLY BALANCE
export const fetchCompoundBalance = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);

		web3.eth.getAccounts().then((accounts) => {
            // lottery.methods.getCompoundBalance().call()
            // .then((balance) => {})
                dispatch(fetchCompoundBalanceSuccess(2.00));
			})
			.catch((err) => {
				dispatch(earnInterestFailed(err));
			});
    }
}

export const fetchCompoundBalanceSuccess = (balance) => {
    return {
        type: actionTypes.FETCH_COMPOUND_SUPPLY_BALANCE_SUCCESS,
        balance: balance
    }
}

export const fetchCompoundBalanceFailed = (error) => {
    return {
        type: actionTypes.FETCH_COMPOUND_SUPPLY_BALANCE_FAILED,
		error: error
    }
}

// RESTART POOL
export const restartPool = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);

		web3.eth.getAccounts().then((accounts) => {
            lottery.methods.restartPool().send({
                    'from': accounts[0]
                })
                dispatch(restartPoolSuccess());
			})
			.catch((err) => {
				dispatch(restartPoolFailed(err));
			});
    }
}

export const restartPoolSuccess = () => {
    return {
        type: actionTypes.RESTART_POOL_SUCCESS
    }
}

export const restartPoolFailed = (error) => {
    return {
        type: actionTypes.RESTART_POOL_FAILED,
		error: error
    }
}

// CREATE POOL
export const createPool = (web3) => {
    return dispatch => {
        const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress);

		web3.eth.getAccounts().then((accounts) => {
            lottery.methods.restartPool().send({
                    'from': accounts[0]
                })
                dispatch(createPoolSuccess());
			})
			.catch((err) => {
				dispatch(createPoolFailed(err));
			});
    }
}

export const createPoolSuccess = () => {
    return {
        type: actionTypes.CREATE_POOL_SUCCESS
    }
}

export const createPoolFailed = (error) => {
    return {
        type: actionTypes.CREATE_POOL_FAILED,
		error: error
    }
}
