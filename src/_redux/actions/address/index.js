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

import { address } from '../api';

export const successAddAddress = payload => ({
	type: GET_ADDRESS_SUCCESS,
	payload
});

export const errorAddAddress = payload => ({
	type: GET_ADDRESS_ERROR,
	payload
});

export const successAddDeliveryAddress = payload => ({
	type: ADD_DELIVERY_ADDRESS_SUCCESS,
	payload
});

export const errorAddDeliveryAddress = payload => ({
	type: ADD_DELIVERY_ADDRESS_ERROR,
	payload
});

export const successEditDeliveryAddress = payload => ({
	type: EDIT_DELIVERY_ADDRESS_SUCCESS,
	payload
});

export const errorEditDeliveryAddress = payload => ({
	type: EDIT_DELIVERY_ADDRESS_ERROR,
	payload
});

export const successEditAddress = payload => ({
	type: EDIT_ADDRESS_SUCCESS,
	payload
});

export const errorEditAddress = payload => ({
	type: EDIT_ADDRESS_ERROR,
	payload
});

export const successRemoveAddress = payload => ({
	type: REMOVE_ADDRESS_SUCCESS,
	payload
});

export const errorRemoveAddress = payload => ({
	type: REMOVE_ADDRESS_ERROR,
	payload
});

export const addAddress = data => async dispatch => {
	if (data.cep) {
		data.cep = data.cep.replace(/(-)/g, '');
	}
	const addressResponse = await address.addAddress(data);

	if (addressResponse.status === 200) {
		dispatch(successAddAddress(addressResponse.data));
	} else {
		dispatch(errorAddAddress(addressResponse));
	}
};

export const addDeliveryAddress = data => async dispatch => {
	if (data.cep) {
		data.cep = data.cep.replace(/(-)/g, '');
	}
	const addressResponse = await address.addAddress(data);

	if (addressResponse.status === 200) {
		dispatch(successAddDeliveryAddress(addressResponse.data));
	} else {
		dispatch(errorAddDeliveryAddress(addressResponse));
	}
};

export const editAddress = data => async dispatch => {
	if (data.cep) {
		data.cep = data.cep.replace(/(-)/g, '');
	}
	const addressResponse = await address.editAddress(data);

	if (addressResponse.status === 200) {
		dispatch(successEditAddress(addressResponse.data));
	} else {
		dispatch(errorEditAddress(addressResponse));
	}
};

export const editDeliveryAddress = data => async dispatch => {
	if (data.cep) {
		data.cep = data.cep.replace(/(-)/g, '');
	}
	const addressResponse = await address.editAddress(data);

	if (addressResponse.status === 200) {
		dispatch(successEditDeliveryAddress(addressResponse.data));
	} else {
		dispatch(errorEditDeliveryAddress(addressResponse));
	}
};
