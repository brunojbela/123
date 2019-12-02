import {
	SET_WAIT_CAMPAIGN,
	REMOVE_WAIT_CAMPAIGN,
	APPLY_CAMPAIGN_SUCCESS,
	APPLY_CAMPAIGN_ERROR
} from '../../actionType';

import { discount } from '../api';
import { successApplyCupom } from '../cupom';

export const includeWaitCampaign = payload => ({
	type: SET_WAIT_CAMPAIGN,
	payload
});

export const excludeWaitCampaign = () => ({
	type: REMOVE_WAIT_CAMPAIGN,
	payload: {}
});

export const successApplyCampaign = () => ({
	type: APPLY_CAMPAIGN_SUCCESS,
	payload: {}
});

export const errorApplyCampaign = () => ({
	type: APPLY_CAMPAIGN_ERROR,
	payload: {}
});

export const setWaitCampaign = data => dispatch => {
	dispatch(includeWaitCampaign(data));
};

export const applyCampaign = (orderId, campaignName) => async dispatch => {
	const response = await discount.apply({ orderId, campaignName });

	if (response.status === 200) {
		dispatch(successApplyCampaign(response.data));
		if (response.data.cupomId) {
			dispatch(successApplyCupom(response.data));
		}
	} else {
		dispatch(errorApplyCampaign(response.data));
	}
	dispatch(excludeWaitCampaign());
};
