import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	address: null,
	network: null,
	balance: null,
	loading: true,
	error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ADDRESS_SUCCESS:
			return updateObject(state, {
				address: action.address,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_ADDRESS_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.FETCH_BALANCE_SUCCESS:
			return updateObject(state, {
				balance: action.balance,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_BALANCE_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.FETCH_NETWORK_SUCCESS:
			return updateObject(state, {
				network: action.network,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_NETWORK_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
        		
		default:
			return state;
	}
}

export default reducer;