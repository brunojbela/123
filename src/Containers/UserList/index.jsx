import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPayerList } from '../../_redux/actions/payer';

class UserList extends Component {
	componentDidMount() {
		this.props.getPayerList();
	}
	render() {
		let authInfo = this.props.Payer.data;

		let userlist = [
			<tr>
				<th>Payer id</th>
				<th>Email</th>
				<th>CPF</th>
			</tr>
		];

		if (!authInfo.error) {
			authInfo.forEach(item => {
				userlist.push(
					<tr>
						<td>{item.payerId}</td>
						<td>{item.email}</td>
						<td>{item.cpf}</td>
					</tr>
				);
			});
		}

		return (
			<div>
				<table border='1' cellPadding='5'>
					<tbody>{userlist}</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = actionObject => {
	return actionObject;
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getPayerList }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList);
