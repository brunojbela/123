import Api from '../_base';

class PaymentApi {
	async setCredit(data) {
		const response = await Api.post('/payments', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async checkCredit(data) {
		const response = await Api.get('/payments/'+ data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}
}

export default new PaymentApi();
