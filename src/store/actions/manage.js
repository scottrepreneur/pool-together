import * as actionTypes from './actionTypes';

const lotteryAddress = process.env.REACT_APP_LOTTERY_CONTRACT_ADDRESS
const lotteryAbi = [{"constant":false,"inputs":[],"name":"splash","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"myDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"poolSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stateOfPool","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"entryData","outputs":[{"name":"Entries","type":"uint256"},{"name":"Size","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"poolReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amtDai","type":"uint256"}],"name":"splashDai","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_stateVar","type":"uint256"}],"name":"setState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawDai","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"entrants","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"daisend","type":"uint256"}],"name":"earnInterest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"daiAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"saver","type":"address"},{"indexed":false,"name":"deposit","type":"uint256"},{"indexed":false,"name":"total","type":"uint256"}],"name":"splashDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"saver","type":"address"},{"indexed":false,"name":"savings","type":"uint256"}],"name":"takeHome","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"state","type":"uint8"}],"name":"Saving","type":"event"}]

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

// SUPPLY COMPOUND FINANCE

// GET COMPOUND SUPPLY BALANCE

// RESTART POOL
