import {
	ADD_SUBSCRIPTION_SUCCESS,
	ADD_SUBSCRIPTION_ERROR,
	EDIT_SUBSCRIPTION_SUCCESS,
	EDIT_SUBSCRIPTION_ERROR,
	REMOVE_SUBSCRIPTION_ERROR,
	REMOVE_SUBSCRIPTION_SUCCESS,
	SET_WAIT_SUBSCRIPTION,
	REMOVE_WAIT_SUBSCRIPTION,
	SET_EDIT_SUBSCRIPTION,
	REMOVE_EDIT_SUBSCRIPTION
} from '../../actionType';

import { combineReducers } from 'redux';

const data = (state = { itens: [] }, { type, payload }) => {
	switch (type) {
		case ADD_SUBSCRIPTION_SUCCESS:
			return {
				...state,
				itens: [...state.itens, payload]
			};
		case ADD_SUBSCRIPTION_ERROR:
			return {
				...state,
				itens: [...state.itens, payload]
			};
		case REMOVE_SUBSCRIPTION_SUCCESS:
			let itensRemove = [];

			state.itens.forEach(item => {
				if (item.subscriptionId !== payload) {
					itensRemove.push(item);
				}
			});

			return {
				...state,
				itens: itensRemove
			};
		case EDIT_SUBSCRIPTION_SUCCESS:
			let itensEdit = [];

			state.itens.forEach(item => {
				if (item.subscriptionId === payload.subscriptionId) {
					itensEdit.push(payload);
				} else {
					itensEdit.push(item);
				}
			});

			return {
				...state,
				itens: itensEdit
			};
		case EDIT_SUBSCRIPTION_ERROR:
			return state;
		case REMOVE_SUBSCRIPTION_ERROR:
			return state;
		default:
			return state;
	}
};

const wait = (state = {}, { type, payload }) => {
	switch (type) {
		case SET_WAIT_SUBSCRIPTION:
			return payload;
		case REMOVE_WAIT_SUBSCRIPTION:
			return {};
		default:
			return state;
	}
};

const edit = (state = {}, { type, payload }) => {
	switch (type) {
		case SET_EDIT_SUBSCRIPTION:
			return payload;
		case REMOVE_EDIT_SUBSCRIPTION:
			return {};
		default:
			return state;
	}
};

export default combineReducers({
	data,
	wait,
	edit
});
