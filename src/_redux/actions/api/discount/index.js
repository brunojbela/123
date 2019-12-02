import Api from '../_base';

class DiscountApi {
	async apply(data) {
		const response = await Api.post('/discounts', data, true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}
}

export default new DiscountApi();
