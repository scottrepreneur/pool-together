import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	loading: true,
	error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_POOL_STATE_SUCCESS:
			return updateObject(state, {
				error: false,
				loading: false
            });
        case actionTypes.SET_POOL_STATE_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
            });
        		
        default:
			return state;
	}
}

export default reducer;