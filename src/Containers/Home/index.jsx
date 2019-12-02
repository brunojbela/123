import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userLogin } from '../../_redux/actions/auth';

import Login from '../../Components/Login';

class Home extends Component {
	render() {
		let authInfo = this.props.Auth.login;

		if (authInfo.logged) {
			this.props.history.push(process.env.PUBLIC_URL + '/userList');
		}

		return (
			<div>
				<Login submit={this.props.userLogin} />
			</div>
		);
	}
}

const mapStateToProps = actionObject => {
	return actionObject;
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ userLogin }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
