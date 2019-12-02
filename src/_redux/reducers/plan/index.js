import { GET_PLAN_LIST_SUCCESS, GET_PLAN_LIST_ERROR } from '../../actionType';

import { combineReducers } from 'redux';

const list = (state = [], { type, payload }) => {
	switch (type) {
		case GET_PLAN_LIST_SUCCESS:
			return payload;
		case GET_PLAN_LIST_ERROR:
			return payload;
		default:
			return state;
	}
};

export default combineReducers({
	list
});
