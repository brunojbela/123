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
	var counter = 0;

	if (response.status === 200) {
		async function check() {
			const response_check = await payment.checkCredit(dados);

			if(response_check.status === 200 ){
				error = 'loading';
				if(response_check.data.paymentId === 'paid' ){
					dispatch(successSetCreditPayment(response.data));
					error = 'false';
				} else if(response_check.data.paymentId === 'failed'){
					dispatch(errorSetCreditPayment(response.data));
					error = 'true';
				} else {
					error = 'loading';
				}
			}else {
				error = 'true';
			}

			counter++;
			if(counter === 7){
				error = 'false';
				return error;
			}

		}

		for (let i = 0; i < 8; i++) {
			setTimeout( check, 5000 * i);
		}

	} else {
		dispatch(errorSetCreditPayment(response.data));
		error = 'true';
		return error;
	}

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
