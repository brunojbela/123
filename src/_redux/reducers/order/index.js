import {
	GET_ORDER_SUCCESS,
	GET_ORDER_ERROR,
	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_ERROR,
	GET_ORDER_VALUE_SUCCESS,
	GET_ORDER_VALUE_ERROR
} from '../../actionType';

import { combineReducers } from 'redux';

const data = (state = [], { type, payload }) => {
	switch (type) {
		case GET_ORDER_SUCCESS:
			return payload;
		case GET_ORDER_ERROR:
			return payload;
		case UPDATE_ORDER_SUCCESS:
			return payload;
		case UPDATE_ORDER_ERROR:
			return payload;
		default:
			return state;
	}
};

const value = (state = {}, { type, payload }) => {
	switch (type) {
		case GET_ORDER_VALUE_SUCCESS:
			return payload;
		case GET_ORDER_VALUE_ERROR:
			return payload;
		default:
			return state;
	}
};

export default combineReducers({
	data,
	value
});
