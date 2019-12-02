import { combineReducers } from 'redux';

import Auth from './auth';
import Payer from './payer';
import Subscription from './subscription';
import Address from './address';
import Order from './order';
import Plan from './plan';
import Payment from './payment';
import Cupom from './cupom';
import Campaign from './campaign';

export default combineReducers({
	Auth,
	Payer,
	Subscription,
	Address,
	Order,
	Plan,
	Payment,
	Cupom,
	Campaign
});
