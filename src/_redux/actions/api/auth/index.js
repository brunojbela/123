import Api from '../_base';

class AuthApi {
	async getLogin(email, password) {
		const response = await Api.post('/login', {
			email,
			password,
		});

		return {
			data: response.data,
			status: response.status,
			statusText: response.statusText,
		};
	}
}

export default new AuthApi();
