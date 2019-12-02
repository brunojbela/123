import { GET_PLAN_LIST_SUCCESS, GET_PLAN_LIST_ERROR } from '../../actionType';

import { plan } from '../api';

export const successGetPlanList = payload => ({
	type: GET_PLAN_LIST_SUCCESS,
	payload
});

export const errorGetPlanList = payload => ({
	type: GET_PLAN_LIST_ERROR,
	payload
});

export const getPlanList = () => async dispatch => {
	const response = await plan.getPlanList();

	if (response.status === 200) {
		dispatch(successGetPlanList(response.data));
	} else {
		dispatch(errorGetPlanList(response.data));
	}
};
