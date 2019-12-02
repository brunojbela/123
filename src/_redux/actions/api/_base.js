import axios from 'axios';
import cookie from 'react-cookies';

class Api {
	constructor(options = {}) {
		this.options = Object.assign(
			{
				contentType: 'application/json'
			},
			options
		);

		this.urlBase = 'https://yalo.com.br/api';
	}

	getConfig(path, auth) {
		const config = Object.assign(
			{
				url: path
			},
			this.options
		);

		if (auth) {
			let token = cookie.load('token');

			config.headers = Object.assign(
				{
					Authorization: 'bearer ' + token
				},
				config.headers
			);
		}

		return config;
	}

	notAuthenticated(err) {
		if (err.response.status === 401 || err.response.status === 302) {
		}

		return err.response;
	}

	get(path, auth = false) {
		path = this.urlBase + path;
		const config = {
			method: 'get',
			...this.getConfig(path, auth)
		};

		return axios(config).catch(this.notAuthenticated);
	}

	post(path, data, auth = false) {
		path = this.urlBase + path;
		const config = {
			method: 'post',
			data,
			...this.getConfig(path, auth)
		};

		return axios(config).catch(this.notAuthenticated);
	}

	put(path, data, auth = false) {
		path = this.urlBase + path;
		const config = {
			method: 'put',
			data,
			...this.getConfig(path, auth)
		};

		return axios(config).catch(this.notAuthenticated);
	}

	delete(path, auth = false) {
		path = this.urlBase + path;
		const config = {
			method: 'delete',
			...this.getConfig(path, auth)
		};

		return axios(config).catch(this.notAuthenticated);
	}
}

export default new Api();
