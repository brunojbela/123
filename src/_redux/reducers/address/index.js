import {
	GET_ADDRESS_SUCCESS,
	GET_ADDRESS_ERROR,
	EDIT_ADDRESS_SUCCESS,
	EDIT_ADDRESS_ERROR,
	REMOVE_ADDRESS_SUCCESS,
	REMOVE_ADDRESS_ERROR,
	ADD_DELIVERY_ADDRESS_SUCCESS,
	ADD_DELIVERY_ADDRESS_ERROR,
	EDIT_DELIVERY_ADDRESS_SUCCESS,
	EDIT_DELIVERY_ADDRESS_ERROR
} from '../../actionType';

import { combineReducers } from 'redux';

const data = (state = { itens: [] }, { type, payload }) => {
	switch (type) {
		case GET_ADDRESS_SUCCESS:
			return {
				...state,
				itens: [...state.itens, payload]
			};
		case GET_ADDRESS_ERROR:
			return {
				...state,
				itens: [...state.itens, payload]
			};
		case REMOVE_ADDRESS_SUCCESS:
			let itensRemove = [];

			state.itens.forEach(item => {
				if (item.addressId !== payload) {
					itensRemove.push(item);
				}
			});

			return {
				...state,
				itens: itensRemove
			};
		case EDIT_ADDRESS_SUCCESS:
			let itensEdit = [];

			state.itens.forEach(item => {
				if (item.addressId === payload.addressId) {
					itensEdit.push(payload);
				} else {
					itensEdit.push(item);
				}
			});

			return {
				...state,
				itens: itensEdit
			};
		case REMOVE_ADDRESS_ERROR:
			return state;
		case EDIT_ADDRESS_ERROR:
			return state;
		default:
			return state;
	}
};

const delivery = (state = {}, { type, payload }) => {
	switch (type) {
		case ADD_DELIVERY_ADDRESS_SUCCESS:
			return payload;
		case ADD_DELIVERY_ADDRESS_ERROR:
			return payload;
		case EDIT_DELIVERY_ADDRESS_SUCCESS:
			return payload;
		case EDIT_DELIVERY_ADDRESS_ERROR:
			return payload;
		default:
			return state;
	}
};

export default combineReducers({
	data,
	delivery
});
