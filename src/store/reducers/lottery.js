import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	lottery_info: null,
	loading: true,
	error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_LOTTERY_INFO_SUCCESS:
			return updateObject(state, {
				lottery_info: action.lottery_info,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_LOTTERY_INFO_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
        		
		default:
			return state;
	}
}

export default reducer;