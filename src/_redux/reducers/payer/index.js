import {
	GET_PAYER_LIST_SUCCESS,
	GET_PAYER_LIST_ERROR,
	GET_PAYER_SUCCESS,
	GET_PAYER_ERROR,
	ADD_PAYER_SUCCESS,
	ADD_PAYER_ERROR
} from '../../actionType';

import { combineReducers } from 'redux';

const list = (state = [], { type, payload }) => {
	switch (type) {
		case GET_PAYER_LIST_SUCCESS:
			return payload;
		case GET_PAYER_LIST_ERROR:
			return payload;
		default:
			return state;
	}
};

const data = (state = [], { type, payload }) => {
	switch (type) {
		case GET_PAYER_SUCCESS:
			return payload;
		case GET_PAYER_ERROR:
			return payload;
		case ADD_PAYER_SUCCESS:
			return payload;
		case ADD_PAYER_ERROR:
			return payload;
		default:
			return state;
	}
};

export default combineReducers({
	list,
	data
});
