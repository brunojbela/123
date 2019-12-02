import {
	SET_WAIT_CAMPAIGN,
	REMOVE_WAIT_CAMPAIGN,
	APPLY_CAMPAIGN_SUCCESS,
	APPLY_CAMPAIGN_ERROR
} from '../../actionType';

import { combineReducers } from 'redux';

const wait = (state = {}, { type, payload }) => {
	switch (type) {
		case SET_WAIT_CAMPAIGN:
			return payload;
		case REMOVE_WAIT_CAMPAIGN:
			return payload;
		default:
			return state;
	}
};

const data = (state = {}, { type, payload }) => {
	switch (type) {
		case APPLY_CAMPAIGN_SUCCESS:
			return payload;
		case APPLY_CAMPAIGN_ERROR:
			return payload;
		default:
			return state;
	}
};

export default combineReducers({
	wait,
	data
});
