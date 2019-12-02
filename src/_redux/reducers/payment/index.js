import {
	SET_CREDIT_PAYMENT_SUCCESS,
	SET_CREDIT_PAYMENT_ERROR,
	SET_BOLETO_PAYMENT_SUCCESS,
	SET_BOLETO_PAYMENT_ERROR
} from '../../actionType';

import { combineReducers } from 'redux';

const data = (state = [], { type, payload }) => {
	switch (type) {
		case SET_CREDIT_PAYMENT_SUCCESS:
			return payload;
		case SET_CREDIT_PAYMENT_ERROR:
			return payload;
		case SET_BOLETO_PAYMENT_SUCCESS:
			return payload;
		case SET_BOLETO_PAYMENT_ERROR:
			return payload;
		default:
			return state;
	}
};

export default combineReducers({
	data
});
