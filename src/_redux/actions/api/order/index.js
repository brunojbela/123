import Api from '../_base';

class Order {
	async addOrder(data) {
		const response = await Api.post('/orders', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async updateOrder(data) {
		const response = await Api.put('/orders', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async getValue(orderId) {
		const response = await Api.get('/orders/value/' + orderId, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}
}

export default new Order();
