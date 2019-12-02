import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormAddress from '../../Components/FormAddress';
import NextBtn from '../../Components/NextBtn';
import Loading from '../../Components/Loading';

import {
	addSubscription,
	editSubscription
} from '../../_redux/actions/subscription';
import { createOrder } from '../../_redux/actions/order';
import { userLogin } from '../../_redux/actions/auth';
import { addPayer, getPayer } from '../../_redux/actions/payer';
import { addAddress, editAddress } from '../../_redux/actions/address';
import { applyCampaign } from '../../_redux/actions/campaign';

import { formUtils } from '../../utils';

class EnderecoCobranca extends Component {
	constructor() {
		super();

		this.formData = this.formData.bind(this);
		this.formSend = this.formSend.bind(this);
		this.errorAccept = this.errorAccept.bind(this);

		this.state = {
			error: false,
			sending: false
		};
	}
	componentDidMount() {
		let { Subscription } = this.props;
		if (!Object.keys(Subscription.wait).length) {
			this.props.history.push(process.env.PUBLIC_URL + '/beneficiario');
		}
	}
	formData(data) {
		this.data = data;
	}
	chainSend() {
		if (this.state.sending) {
			let { Subscription, Order, Payer, Address, Auth, Campaign } = this.props;

			if (Subscription.edit.subscriptionId) {
				let subscriptionData = Subscription.wait;
				let addressData = formUtils.formatData(this.data);

				subscriptionData.subscriptionId = Subscription.edit.subscriptionId;
				subscriptionData.addressId = Subscription.edit.addressId;
				subscriptionData.orderId = Subscription.edit.orderId;
				addressData.addressId = Subscription.edit.addressId;

				this.props.editSubscription(subscriptionData);
				this.props.editAddress(addressData);

				this.props.history.push(process.env.PUBLIC_URL + '/carrinho');
			} else {
				let subscriptionData = Subscription.wait;
				let subscriptionIndex = Subscription.data.itens.length;
				let addressData = formUtils.formatData(this.data);

				let subscriptionLastIndex = Subscription.data.itens.length - 1;
				let addressLastIndex = Address.data.itens.length - 1;

				if (Order.data.error || Auth.login.error) {
					this.setState({
						error: 'Houve um erro inesperado. Por favor, tente novamente!',
						errorFunc: () => {
							window.location = '/loja/';
						}
					});
				} else if (
					(Subscription.data.itens[subscriptionLastIndex] &&
						Subscription.data.itens[subscriptionLastIndex].error) ||
					(Address.data.itens[addressLastIndex] &&
						Address.data.itens[addressLastIndex].error)
				) {
					this.setState({
						error:
							'Não foi possível adicionar esse beneficiário. Por favor, tente novamente!',
						errorFunc: () => {
							this.props.history.push(process.env.PUBLIC_URL + '/carrinho');
						}
					});
				} else if (Order.data.orderId && Campaign.wait.utm_campaign) {
					this.props.applyCampaign(
						Order.data.orderId,
						Campaign.wait.utm_campaign
					);
				} else if (
					Order.data.orderId &&
					Address.data.itens[subscriptionIndex]
				) {
					this.props.addSubscription(
						Order.data.orderId,
						Address.data.itens[subscriptionIndex].addressId,
						subscriptionData
					);
					console.log(this.props.addSubscription);
					this.props.history.push(process.env.PUBLIC_URL + '/carrinho');
				} else if (
					!Order.data.orderId &&
					Payer.data.payerId &&
					Address.data.itens[0]
				) {
					this.props.createOrder(
						Payer.data.payerId,
						Address.data.itens[0].addressId
					);
				} else if (Payer.data.payerId && Auth.login.logged) {
					this.props.addAddress(addressData);
				} else if (Payer.data.payerId) {
					this.props.userLogin(Payer.data.email, '');
				} else if (!Payer.data.payerId && Auth.login.logged) {
					this.props.getPayer(Auth.login.payerId);
				} else if (
					Payer.data.error &&
					Payer.data.error === 'Payer already exists.'
				) {
					this.props.userLogin(subscriptionData.email, '');
				} else {
					this.props.addPayer(subscriptionData.email, subscriptionData.cpf);
				}
			}
		}
	}
	formSend() {
		let checkDataValue = formUtils.checkData(this.data, ['complement']);

		if (checkDataValue) {
			this.setState({
				error: checkDataValue
			});
		} else {
			this.setState({
				sending: true
			});
		}
	}
	errorAccept() {
		if (this.state.errorFunc) {
			this.state.errorFunc();
		} else {
			this.setState({
				error: null
			});
		}
	}
	render() {
		let { Subscription } = this.props;

		let editData = {};

		if (Subscription.edit) {
			let addressId = Subscription.edit.addressId;

			let { Address } = this.props;

			let addressItem = {};

			Address.data.itens.forEach(item => {
				if (item.addressId === addressId) {
					addressItem = item;
				}
			});

			editData = addressItem;
		}
		this.chainSend();

		return (
			<div className='form-wrapper'>
				<Loading show={this.state.sending}></Loading>
				<div className='container-fluid'>
					<div className='row'>
						<FormAddress
							onData={this.formData}
							error={this.state.error}
							errorAccept={this.errorAccept}
							initialData={editData}></FormAddress>
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
	bindActionCreators(
		{
			addSubscription,
			createOrder,
			userLogin,
			addPayer,
			getPayer,
			addAddress,
			editSubscription,
			editAddress,
			applyCampaign
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnderecoCobranca);
