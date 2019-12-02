import {
	SET_CREDIT_PAYMENT_SUCCESS,
	SET_CREDIT_PAYMENT_ERROR,
	SET_BOLETO_PAYMENT_SUCCESS,
	SET_BOLETO_PAYMENT_ERROR
} from '../../actionType';

import { payment } from '../api';

export const successSetCreditPayment = payload => ({
	type: SET_CREDIT_PAYMENT_SUCCESS,
	payload
});

export const errorSetCreditPayment = payload => ({
	type: SET_CREDIT_PAYMENT_ERROR,
	payload
});

export const successSetBoletoPayment = payload => ({
	type: SET_BOLETO_PAYMENT_SUCCESS,
	payload
});

export const errorSetBoletoPayment = payload => ({
	type: SET_BOLETO_PAYMENT_ERROR,
	payload
});

export const setCreditPayment = (orderId, cardData) => async dispatch => {
	cardData.forEach(cardDataItem => {
		let cardNumber = cardDataItem.cardNumber;
		cardNumber = cardNumber.replace(/(\s)/g, '');
		cardDataItem.cardNumber = cardNumber;
	});

	const response = await payment.setCredit({
		orderId: orderId,
		paymentMethod: 'credit_card',
		cardInfo: cardData,
	});
	var dados = response.data.paymentId;
	var error = '';
	if (response.status === 200) {
		
		const response_check = await payment.checkCredit(dados);
		console.log(dados);
		console.log(response_check);
		if(response_check.status === 200){
			
			//inserir while com contdown cada 5 segundos fazer consulta 
			if(response_check.data.paymentId === 'paid' || response_check.data.paymentId === 'failed'){
			dispatch(successSetCreditPayment(response.data));
			error = 'false';
			} else {
				error = 'true';
			}
		}else{
			error = 'true';
		};
	} else {
		dispatch(errorSetCreditPayment(response.data));
		error = 'true';
	}
	return error;
};

export const setBoletoPayment = orderId => async dispatch => {
	const response = await payment.setCredit({
		orderId: orderId,
		paymentMethod: 'boleto'
	});

	if (response.status === 200) {
		dispatch(successSetBoletoPayment(response.data));
	} else {
		dispatch(errorSetBoletoPayment(response.data));
	}
};
