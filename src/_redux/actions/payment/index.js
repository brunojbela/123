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

export const setCreditPayment = (orderId, cardData, valida) => async dispatch => {
	var error = '';
	if(valida === 'verdadeiro'){
		const response_check = await payment.checkCredit(orderId);
		console.log(orderId);
		console.log(response_check);
		console.log(response_check.status);
		if(response_check.status === 200){
			//inserir while com contdown cada 5 segundos fazer consulta 
			if(response_check.data.status === 'paid') {
				//dispatch(successSetCreditPayment(response_check.data));
				error = 'false';
			}
			else if(response_check.data.status === 'failed'){
				dispatch(errorSetCreditPayment(response_check.data));
				error = 'true1';
			} else {
				error = 'loading';
			}
		}else{
			error = 'true';
		};
	}
else {
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
	if (response.status !== 200) {
		dispatch(errorSetCreditPayment(response.data));
		error = 'true';
	} else {
		error = response.data.paymentId;
	} 
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
