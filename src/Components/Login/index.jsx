import React, { Component } from 'react';

import { Input, InputPass } from '../Shared/Form';

class Login extends Component {
	constructor() {
		super();

		this.state = { email: '', pass: '' };

		this.setEmail = this.setEmail.bind(this);
		this.setPass = this.setPass.bind(this);
		this.sendLogin = this.sendLogin.bind(this);
	}
	sendLogin() {
		this.props.submit(this.state.email, this.state.pass);
	}
	setEmail(event) {
		this.setState({ email: event.target.value });
	}
	setPass(event) {
		this.setState({ pass: event.target.value });
	}
	render() {
		return (
			<div>
				<Input value={this.state.email} onChange={this.setEmail} />
				<br />
				<InputPass value={this.state.pass} onChange={this.setPass} />
				<br />
				<input type='submit' onClick={this.sendLogin} />
			</div>
		);
	}
}

export default Login;
