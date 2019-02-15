import * as actionTypes from './actionTypes';
import Maker from '@makerdao/dai';

// GET LOTTERY INFO

export const fetchLotteryInfo = (token) => {
    return dispatch => {
        dispatch(fetchLotteryInfoSuccess("FAKE_LOTTERY_DATA"));
    }
}

export const fetchLotteryInfoSuccess = (lottery_info) => {
    return {
		type: actionTypes.FETCH_LOTTERY_INFO_SUCCESS,
		lottery_info: lottery_info
	};
}

export const fetchLotteryInfoFailed = (error) => {
    return {
		type: actionTypes.FETCH_LOTTERY_INFO_FAILED,
		error: error
	};
}