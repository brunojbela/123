import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from '../../actionType';

import { auth } from '../api';

export const successLogin = payload => ({
	type: LOGIN_SUCCESS,
	payload,
});

export const loadingLogin = () => ({
	type: LOGIN_LOADING,
});

export const errorLogin = payload => ({
	type: LOGIN_ERROR,
	payload,
});

export const userLogin = (email, pass) => async dispatch => {
	dispatch(loadingLogin);

	const response = await auth.getLogin(email, pass);

	// let responsePrint = {
	// 	boletoData: utils.filterJson(response.data),
	// };

	if (response.status === 200) {
		dispatch(successLogin(response.data));
	} else {
		dispatch(errorLogin(response.data));
	}
};
