import Api from '../_base';

class Address {
	async addAddress(data) {
		const response = await Api.post('/address', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}

	async editAddress(data) {
		const response = await Api.put('/address', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}
}

export default new Address();
