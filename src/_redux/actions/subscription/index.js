import {
	ADD_SUBSCRIPTION_ERROR,
	ADD_SUBSCRIPTION_SUCCESS,
	EDIT_SUBSCRIPTION_ERROR,
	EDIT_SUBSCRIPTION_SUCCESS,
	REMOVE_SUBSCRIPTION_ERROR,
	REMOVE_SUBSCRIPTION_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SET_WAIT_SUBSCRIPTION,
	REMOVE_WAIT_SUBSCRIPTION,
	SET_EDIT_SUBSCRIPTION,
	REMOVE_EDIT_SUBSCRIPTION
} from '../../actionType';

import { subscription } from '../api';

import { successRemoveAddress, errorRemoveAddress } from '../address';
import { errorGetOrderValue } from '../order';

export const successLogin = payload => ({
	type: LOGIN_SUCCESS,
	payload
});

export const errorLogin = payload => ({
	type: LOGIN_ERROR,
	payload
});

export const errorAddSubscription = payload => ({
	type: ADD_SUBSCRIPTION_ERROR,
	payload
});

export const successAddSubscription = payload => ({
	type: ADD_SUBSCRIPTION_SUCCESS,
	payload
});

export const errorEditSubscription = payload => ({
	type: EDIT_SUBSCRIPTION_ERROR,
	payload
});

export const successEditSubscription = payload => ({
	type: EDIT_SUBSCRIPTION_SUCCESS,
	payload
});

export const errorRemoveSubscription = payload => ({
	type: REMOVE_SUBSCRIPTION_ERROR,
	payload
});

export const successRemoveSubscription = payload => ({
	type: REMOVE_SUBSCRIPTION_SUCCESS,
	payload
});

export const includeWaitSubscription = payload => ({
	type: SET_WAIT_SUBSCRIPTION,
	payload
});

export const removeWaitSubscription = payload => ({
	type: REMOVE_WAIT_SUBSCRIPTION,
	payload
});

export const includeEditSubscription = payload => ({
	type: SET_EDIT_SUBSCRIPTION,
	payload
});

export const removeEditSubscription = payload => ({
	type: REMOVE_EDIT_SUBSCRIPTION,
	payload
});

export const addSubscription = (orderId, addressId, data) => async dispatch => {
	let phone = data.phone;
	phone = phone.replace(/(\(|\)\s|-)/g, '');
	let cpf = data.cpf;
	cpf = cpf.replace(/(\.|-)/g, '');
	const subscriptionResponse = await subscription.addSubscription({
		email: data.email,
		cpf,
		name: data.name,
		lastname: ' ',
		birthday: data.birthday,
		gender: data.gender,
		phone,
		addressId: addressId,
		orderId: orderId
	});

	if (subscriptionResponse.status === 200) {
		dispatch(successAddSubscription(subscriptionResponse.data));
		dispatch(removeWaitSubscription());
	} else {
		dispatch(errorAddSubscription(subscriptionResponse.data));
		dispatch(removeWaitSubscription());
	}
};

export const editSubscription = data => async dispatch => {
	let phone = data.phone;
	phone = phone.replace(/(\(|\)\s|-)/g, '');
	let cpf = data.cpf;
	cpf = cpf.replace(/(\.|-)/g, '');
	const subscriptionResponse = await subscription.editSubscription({
		subscriptionId: data.subscriptionId,
		email: data.email,
		cpf,
		name: data.name,
		lastname: ' ',
		birthday: data.birthday,
		gender: data.gender,
		phone,
		addressId: data.addressId,
		orderId: data.orderId
	});

	if (subscriptionResponse.status === 200) {
		dispatch(successEditSubscription(subscriptionResponse.data));
		dispatch(removeEditSubscription());
		dispatch(removeWaitSubscription());
		dispatch(errorGetOrderValue({}));
	} else {
		dispatch(errorEditSubscription(subscriptionResponse.data));
		dispatch(removeEditSubscription());
		dispatch(removeWaitSubscription());
		dispatch(errorGetOrderValue({}));
	}
};

export const removeSubscription = (
	subscriptionId,
	addressId
) => async dispatch => {
	const subscriptionResponse = await subscription.removeSubscription(
		subscriptionId
	);

	if (
		subscriptionResponse.status === 200 &&
		subscriptionResponse.data.success
	) {
		dispatch(successRemoveSubscription(subscriptionId));
		dispatch(successRemoveAddress(addressId));
		dispatch(errorGetOrderValue({}));
	} else {
		dispatch(errorRemoveSubscription(subscriptionResponse.data));
		dispatch(errorRemoveAddress(subscriptionResponse.data));
		dispatch(errorGetOrderValue({}));
	}
};

export const waitSubscription = data => dispatch => {
	dispatch(includeWaitSubscription(data));
};

export const deleteWaitSubscription = index => dispatch => {
	dispatch(removeWaitSubscription());
};

export const addEditSubscription = data => dispatch => {
	dispatch(includeEditSubscription(data));
};

export const deleteEditSubscription = index => dispatch => {
	dispatch(removeEditSubscription());
};
