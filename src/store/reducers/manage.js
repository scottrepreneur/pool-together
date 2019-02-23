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
        		
        default:
			return state;
	}
}

export default reducer;