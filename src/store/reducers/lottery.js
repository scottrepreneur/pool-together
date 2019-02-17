import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	currentPot: null,
    timeStopSplash: null,
    timeStopSave: null,
    timeStopPayout: null,
	loading: true,
	error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    	case actionTypes.FETCH_TIME_STOP_SPLASH_SUCCESS:
			return updateObject(state, {
				timeStopSplash: action.timeStopSplash,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_TIME_STOP_SPLASH_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
            });
        case actionTypes.FETCH_CURRENT_POOL_SUCCESS:
			return updateObject(state, {
				currentPool: action.currentPool,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_CURRENT_POOL_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
            });
		case actionTypes.FETCH_CURRENT_APR_SUCCESS:
			return updateObject(state, {
				currentApr: action.currentApr,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_CURRENT_APR_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.FETCH_ENTRIES_SUCCESS:
			return updateObject(state, {
				entries: action.entries,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_ENTRIES_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});

		default:
			return state;
	}
}

export default reducer;