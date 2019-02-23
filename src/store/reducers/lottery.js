import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	currentPot: 0,
	entrants: 0,
	entries: [],
	deposit: 0,
    timeStopSplash: null,
    timeStopSave: null,
	timeStopPayout: null,
	loading: true,
	error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		
		// INFORMATION STATES
		case actionTypes.FETCH_POOL_STATE_SUCCESS:
			return updateObject(state, {
				poolState: action.poolState,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_POOL_STATE_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
            });
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
		case actionTypes.FETCH_DEPOSIT_SUCCESS:
			return updateObject(state, {
				deposit: action.deposit,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_DEPOSIT_FAILED:
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
		case actionTypes.FETCH_ENTRANTS_SUCCESS:
			return updateObject(state, {
				entrants: action.entrants,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_ENTRANTS_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});

		// ACTIONS
		case actionTypes.CHECK_DAI_ALLOWANCE_SUCCESS:
			return updateObject(state, {
				allowance: action.allowance,
				error: false,
				loading: false
            });
        case actionTypes.CHECK_DAI_ALLOWANCE_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.ENTER_ETH_POOL_SUCCESS:
			return updateObject(state, {
				loading: false
			});
		case actionTypes.ENTER_ETH_POOL_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.ENTER_DAI_POOL_SUCCESS:
			return updateObject(state, {
				loading: false
			});
		case actionTypes.ENTER_DAI_POOL_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});

		default:
			return state;
	}
}

export default reducer;