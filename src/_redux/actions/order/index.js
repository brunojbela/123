import {
	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_ERROR,
	GET_ORDER_VALUE_SUCCESS,
	GET_ORDER_VALUE_ERROR,
	GET_ORDER_SUCCESS,
	GET_ORDER_ERROR
} from '../../actionType';

import { order } from '../api';

export const successUpdateOrder = payload => ({
	type: UPDATE_ORDER_SUCCESS,
	payload
});

export const errorUpdateOrder = payload => ({
	type: UPDATE_ORDER_ERROR,
	payload
});

export const successGetOrderValue = payload => ({
	type: GET_ORDER_VALUE_SUCCESS,
	payload
});

export const errorGetOrderValue = payload => ({
	type: GET_ORDER_VALUE_ERROR,
	payload
});

export const successAddOrder = payload => ({
	type: GET_ORDER_SUCCESS,
	payload
});

export const errorAddOrder = payload => ({
	type: GET_ORDER_ERROR,
	payload
});

export const setPlanOrder = (planId, orderId) => async dispatch => {
	const response = await order.updateOrder({
		orderId,
		planId
	});

	if (response.status === 200) {
		dispatch(successUpdateOrder(response.data));
		dispatch(errorGetOrderValue({}));
	} else {
		dispatch(errorUpdateOrder(response.data));
	}
};

export const updateAddressOrder = (orderId, addressId) => async dispatch => {
	const response = await order.updateOrder({
		orderId,
		addressId
	});

	if (response.status === 200) {
		dispatch(successUpdateOrder(response.data));
	} else {
		dispatch(errorUpdateOrder(response.data));
	}
};

export const getOrderValue = orderId => async dispatch => {
	const response = await order.getValue(orderId);

	if (response.status === 200) {
		dispatch(successGetOrderValue(response.data));
	} else {
		dispatch(errorGetOrderValue(response.data));
	}
};

export const createOrder = (payerId, addressId) => async dispatch => {
	const orderResponse = await order.addOrder({
		payerId,
		addressId
	});

	if (orderResponse.status === 200) {
		dispatch(successAddOrder(orderResponse.data));
	} else {
		dispatch(errorAddOrder(orderResponse.data));
	}
};
