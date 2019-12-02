import Api from '../_base';

class PlanApi {
	async getPlanList() {
		const response = await Api.get('/plans', true);

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText
		};
	}
}

export default new PlanApi();
