import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from '../../actionType';

import cookie from 'react-cookies';
import { combineReducers } from 'redux';

const login = (state = [], { type, payload }) => {
	switch (type) {
		case LOGIN_SUCCESS:
			cookie.save('token', payload.token);
			return {
				logged: true,
				payerId: payload.payerId
			};
		case LOGIN_ERROR:
			return {
				logged: false,
				error: payload.error
			};
		case LOGIN_LOADING:
			return state;
		default:
			return state;
	}
};

export default combineReducers({
	login
});
