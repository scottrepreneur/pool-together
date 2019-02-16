import * as actionTypes from '../actions/actionTypes';

// GET TIME TO STOP ALLOWING PARTICIPANTS TO SPLASH

export const fetchTimeStopSplash = () => {
    return dispatch => {
        dispatch(fetchTimeStopSplashSuccess("2019-02-15 18:52:21.42562"));
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

export const fetchCurrentPot = () => {
    return dispatch => {
        dispatch(fetchCurrentPotSuccess("$500"));
    }
}

export const fetchCurrentPotSuccess = (pot) => {
    return {
		type: actionTypes.FETCH_CURRENT_POT_SUCCESS,
		currentPot: pot
	};
}

export const fetchCurrentPotFailed = (error) => {
    return {
		type: actionTypes.FETCH_CURRENT_POT_FAILED,
		error: error
	};
}

// GET ENTER POOL

export const enterPool = (web3) => {
    return dispatch => {
        console.log("enter!");
        dispatch(enterPoolSuccess());
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