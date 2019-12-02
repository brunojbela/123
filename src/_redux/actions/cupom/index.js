import { APPLY_CUPOM_SUCCESS, APPLY_CUPOM_ERROR } from '../../actionType';

import { discount } from '../api';
import { errorGetOrderValue } from '../order';

export const successApplyCupom = payload => ({
	type: APPLY_CUPOM_SUCCESS,
	payload
});

export const errorApplyCupom = payload => ({
	type: APPLY_CUPOM_ERROR,
	payload
});

export const applyCupom = (orderId, cupomId) => async dispatch => {
	const response = await discount.apply({ orderId, cupomId });

	if (response.status === 200) {
		dispatch(successApplyCupom(response.data));
		dispatch(errorGetOrderValue({}));
	} else {
		dispatch(errorApplyCupom(response.data));
	}
};

export const clearCupomError = () => dispatch => {
	dispatch(successApplyCupom({}));
};
