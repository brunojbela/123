import {
	GET_PAYER_SUCCESS,
	GET_PAYER_ERROR,
	GET_PAYER_LIST_SUCCESS,
	GET_PAYER_LIST_ERROR,
	ADD_PAYER_SUCCESS,
	ADD_PAYER_ERROR
} from '../../actionType';

import { payer } from '../api';

export const successGetPayer = payload => ({
	type: GET_PAYER_SUCCESS,
	payload
});

export const errorGetPayer = payload => ({
	type: GET_PAYER_ERROR,
	payload
});

export const successGetPayerList = payload => ({
	type: GET_PAYER_LIST_SUCCESS,
	payload
});

export const errorGetPayerList = payload => ({
	type: GET_PAYER_LIST_ERROR,
	payload
});

export const successAddPayer = payload => ({
	type: ADD_PAYER_SUCCESS,
	payload
});

export const errorAddPayer = payload => ({
	type: ADD_PAYER_ERROR,
	payload
});

export const getPayerList = () => async dispatch => {
	const response = await payer.getPayerList();

	if (response.status === 200) {
		dispatch(successGetPayerList(response.data));
	} else {
		dispatch(errorGetPayerList(response.data));
	}
};

export const getPayer = payerId => async dispatch => {
	const response = await payer.getPayer(payerId);

	if (response.status === 200) {
		dispatch(successGetPayer(response.data));
	} else {
		dispatch(errorGetPayer(response.data));
	}
};

export const addPayer = (email, cpf) => async dispatch => {
	cpf = cpf.replace(/(\.|-)/g, '');
	const payerResponse = await payer.createPayer({
		email,
		cpf,
		password: ''
	});

	if (payerResponse.status === 200) {
		dispatch(successAddPayer(payerResponse.data));
	} else {
		dispatch(errorAddPayer(payerResponse.data));
	}
};
