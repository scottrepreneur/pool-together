import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	manager: null,	
	loading: true,
	error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_MANAGER_SUCCESS:
			return updateObject(state, {
				manager: action.manager,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_MANAGER_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.PICK_WINNER_SUCCESS:
			return updateObject(state, {
				error: false,
				loading: false
            });
        case actionTypes.PICK_WINNER_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.EARN_INTEREST_SUCCESS:
			return updateObject(state, {
				error: false,
				loading: false
            });
        case actionTypes.EARN_INTEREST_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.FETCH_COMPOUND_SUPPLY_BALANCE_SUCCESS:
			return updateObject(state, {
				compoundBalance: action.compoundBalance,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_COMPOUND_SUPPLY_BALANCE_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.RESTART_POOL_SUCCESS:
			return updateObject(state, {
				error: false,
				loading: false
            });
        case actionTypes.RESTART_POOL_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.CREATE_POOL_SUCCESS:
			return updateObject(state, {
				poolAddress: action.poolAddress,
				error: false,
				loading: false
            });
        case actionTypes.CREATE_POOL_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		
        		
        default:
			return state;
	}
}

export default reducer;