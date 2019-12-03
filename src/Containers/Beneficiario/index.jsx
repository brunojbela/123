

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NextBtn from '../../Components/NextBtn';
import FormBeneficiario from '../../Components/FormBeneficiario';

import { waitSubscription } from '../../_redux/actions/subscription';
import { setWaitCampaign } from '../../_redux/actions/campaign';

import { formUtils, campaignUtils } from '../../utils';

class Beneficiario extends Component {
	constructor() {
		super();

		this.formData = this.formData.bind(this);
		this.formSend = this.formSend.bind(this);
		this.errorAccept = this.errorAccept.bind(this);

		this.state = {
			error: null
		};
	}
	componentWillMount() {
		if (campaignUtils.checkExist(this.props.location.search)) {
			let campaignData = campaignUtils.getData();
			this.props.setWaitCampaign(campaignData);
		}
	}
	formData(data) {
		this.data = data;
	}
	formSend() {
		let checkDataValue = formUtils.checkData(this.data);
		if (checkDataValue) {
			this.setState({
				error: checkDataValue
			});
		} else {
			this.props.waitSubscription(formUtils.formatData(this.data));
			this.props.history.push(process.env.PUBLIC_URL + '/enderecoBeneficiario');
		}
	}
	errorAccept() {
		this.setState({
			error: null
		});
	}
	render() {
		let { Subscription } = this.props;

		let editData = {};

		if (Subscription.edit.name) {
			editData = Subscription.edit;
		} else if (Subscription.wait.name) {
			editData = Subscription.wait;
		}

		return (
			<div className='form-wrapper'>
				<div className='container-fluid'>
					<div className='row'>
						<FormBeneficiario
							initialData={editData}
							onData={this.formData}
							error={this.state.error}
							errorAccept={this.errorAccept}></FormBeneficiario>
						<NextBtn onClick={this.formSend}></NextBtn>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = actionObject => {
	return actionObject;
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ waitSubscription, setWaitCampaign }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Beneficiario);




