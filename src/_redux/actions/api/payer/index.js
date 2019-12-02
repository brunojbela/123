import Api from '../_base';

class PayerApi {
	async getPayerList() {
		const response = await Api.get('/payers', true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async getPayer(payerId) {
		const response = await Api.get('/payers/' + payerId, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async createPayer(data) {
		const response = await Api.post('/payers', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}
}

export default new PayerApi();
