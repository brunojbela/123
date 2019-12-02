import Api from '../_base';

class Subscription {
	async addSubscription(data) {
		const response = await Api.post('/subscriptions', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async editSubscription(data) {
		const response = await Api.put('/subscriptions', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async removeSubscription(subscriptionId) {
		const response = await Api.delete('/subscriptions/' + subscriptionId, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}
}

export default new Subscription();
