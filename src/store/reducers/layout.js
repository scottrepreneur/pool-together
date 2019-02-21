import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	address: null,
	network: null,
	ethBalance: 0,
	daiBalance: 0,
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
		case actionTypes.FETCH_ETH_BALANCE_SUCCESS:
			return updateObject(state, {
				ethBalance: action.balance,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_ETH_BALANCE_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.FETCH_DAI_BALANCE_SUCCESS:
			return updateObject(state, {
				daiBalance: action.balance,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_DAI_BALANCE_FAILED:
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