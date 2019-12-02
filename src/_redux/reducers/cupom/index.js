import { APPLY_CUPOM_SUCCESS, APPLY_CUPOM_ERROR } from '../../actionType';

import { combineReducers } from 'redux';

const data = (state = {}, { type, payload }) => {
	switch (type) {
		case APPLY_CUPOM_SUCCESS:
			return payload;
		case APPLY_CUPOM_ERROR:
			let returnData = payload;
			if (payload.error === 'Already discount to this order') {
				returnData = payload.cupons[0];
			}
			return returnData;
		default:
			return state;
	}
};

export default combineReducers({
	data
});
