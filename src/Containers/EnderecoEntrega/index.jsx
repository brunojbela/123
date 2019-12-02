import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateAddressOrder } from '../../_redux/actions/order';
import {
	addDeliveryAddress,
	editDeliveryAddress
} from '../../_redux/actions/address';

import FormAddress from '../../Components/FormAddress';
import NextBtn from '../../Components/NextBtn';

import { formUtils } from '../../utils';

class Entrega extends Component {
	constructor() {
		super();

		this.formData = this.formData.bind(this);
		this.formSend = this.formSend.bind(this);
		this.errorAccept = this.errorAccept.bind(this);

		this.state = {
			error: false,
			sending: false,
			errorFunc: null
		};
	}
	componentDidMount() {
		let { Order } = this.props;
		if (!Order.data.orderId) {
			this.props.history.push(process.env.PUBLIC_URL + '/beneficiario');
		}
	}
	formData(data) {
		this.data = data;
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
	chainSend() {
		let { Address, Order } = this.props;
		if (this.state.sending) {
			let addressId = Address.delivery.addressId;
			let orderId = Order.data.orderId;
			let orderAddressId = Order.data.addressId;
			let addressData = formUtils.formatData(this.data);

			if (orderId && addressData && !addressId) {
				this.props.addDeliveryAddress(addressData);
			} else if (orderId && addressData && orderAddressId === addressId) {
				addressData.addressId = addressId;
				this.props.editDeliveryAddress(addressData);
				this.props.history.push(process.env.PUBLIC_URL + '/carrinho');
			} else if (addressId && orderId) {
				this.props.updateAddressOrder(orderId, addressId);
				this.props.history.push(process.env.PUBLIC_URL + '/carrinho');
			} else {
				this.setState({
					error: 'Houve um erro inesperado. Por favor, tente novamente!',
					errorFunc: () => {
						window.location = '/loja/';
					}
				});
			}
		}
	}
	errorAccept() {
		if (this.state.errorFunc) {
			this.state.errorFunc();
		}
		this.setState({
			error: null
		});
	}
	render() {
		let { Address } = this.props;
		this.chainSend();

		let editData = null;

		if (Address.delivery.addressId) {
			editData = Address.delivery;
		}

		return (
			<div className='form-wrapper'>
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
		{ updateAddressOrder, addDeliveryAddress, editDeliveryAddress },
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Entrega);
