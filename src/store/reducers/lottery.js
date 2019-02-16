import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	lottery_info: null,
	loading: true,
	error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ACCOUNT_INFO_SUCCESS:
			return updateObject(state, {
				accountInfo: action.accountInfo,
				error: false,
				loading: false
            });
        case actionTypes.FETCH_ACCOUNT_INFO_FAILED:
			return updateObject(state, {
				error: action.error,
				loading: false
			});
		case actionTypes.FETCH_LOTTERY_INFO_SUCCESS:
			return updateObject(state, {
				lotteryInfo: action.lotteryInfo,
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