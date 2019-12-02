import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPlanList } from '../../_redux/actions/plan';
import {
	setPlanOrder,
	getOrderValue,
	updateAddressOrder
} from '../../_redux/actions/order';
import { applyCupom, clearCupomError } from '../../_redux/actions/cupom';
import {
	removeSubscription,
	addEditSubscription
} from '../../_redux/actions/subscription';

import { Link } from 'react-router-dom';

import numeral from 'numeral';

class Carrinho extends Component {
	constructor() {
		super();

		this.state = {
			planError: false,
			subscriptionOption: null,
			setCupom: false,
			cupomId: '',
			editDeliveryAddress: false
		};

		this.setOrderPlan = this.setOrderPlan.bind(this);
		this.goPayment = this.goPayment.bind(this);
		this.planErrorAccept = this.planErrorAccept.bind(this);
		this.openSubscriptionOptions = this.openSubscriptionOptions.bind(this);
		this.closeSubscriptionOptions = this.closeSubscriptionOptions.bind(this);
		this.removeSubscription = this.removeSubscription.bind(this);
		this.editSubscription = this.editSubscription.bind(this);
		this.showAddCupom = this.showAddCupom.bind(this);
		this.applyCupom = this.applyCupom.bind(this);
		this.changeCupom = this.changeCupom.bind(this);
		this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
		this.closeDeliveryAddress = this.closeDeliveryAddress.bind(this);
	}
	componentDidMount() {
		let { Order } = this.props;
		if (Order.data.orderId) {
			this.props.getOrderValue(Order.data.orderId);
		} else {
			window.location = '/loja/';
		}
	}
	setOrderPlan(e) {
		let { Order } = this.props;
		let planId = e.target.value;
		let orderId = Order.data.orderId;

		if (planId && orderId) {
			this.props.setPlanOrder(planId, orderId);
		}
	}
	applyCupom() {
		let { Order } = this.props;
		let cupomId = this.state.cupomId;
		let orderId = Order.data.orderId;
		if (orderId && cupomId) {
			this.props.applyCupom(orderId, cupomId);
			this.showAddCupom();
		}
	}
	goPayment() {
		let { Order } = this.props;
		if (Order.data.planId) {
			this.props.history.push(process.env.PUBLIC_URL + '/pagamento');
		} else {
			this.setState({
				planError: true
			});
		}
	}
	scroolToBottom() {
		let $ = window.jQuery;
		$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
	}
	findPlanById(planId) {
		let dataReturn = null;
		let { Plan } = this.props;
		if (!Plan.list.error) {
			Plan.list.forEach(planItem => {
				if (planItem.planId === planId) {
					dataReturn = planItem;
				}
			});
		}

		return dataReturn;
	}
	planErrorAccept() {
		this.setState({
			planError: false
		});
	}
	removeSubscription() {
		if (this.state.subscriptionOption) {
			let subscriptionData = this.state.subscriptionOption.split('|');
			let subscriptionId = subscriptionData[0];
			let addressId = subscriptionData[2];

			this.props.removeSubscription(subscriptionId, addressId);

			this.setState({
				subscriptionOption: null
			});
		}
	}
	editSubscription() {
		if (this.state.subscriptionOption) {
			let subscriptionData = this.state.subscriptionOption.split('|');
			let subscriptionId = subscriptionData[0];
			let { Subscription } = this.props;

			let subscriptionItem = {};

			Subscription.data.itens.forEach(item => {
				if (item.subscriptionId === subscriptionId) {
					subscriptionItem = item;
				}
			});

			this.props.addEditSubscription(subscriptionItem);

			this.setState({
				subscriptionOption: null
			});

			this.props.history.push(process.env.PUBLIC_URL + '/beneficiario');
		}
	}
	subscriptionOptions() {
		let { Subscription } = this.props;
		let optionElm = '';

		if (this.state.subscriptionOption) {
			let subscriptionData = this.state.subscriptionOption.split('|');
			let planName = subscriptionData[1];
			let optionItens = [];
			optionItens.push(
				<span key='1' onClick={this.editSubscription}>
					Editar
				</span>
			);

			if (Subscription.data.itens.length > 1) {
				optionItens.push(
					<span key='2' onClick={this.removeSubscription}>
						Remover
					</span>
				);
			}

			optionItens.push(
				<span
					key='3'
					onClick={this.closeSubscriptionOptions}
					className='close-overlay'>
					Voltar
				</span>
			);

			optionElm = (
				<div className='overlay' style={{ display: 'block' }}>
					<div className='overlay-box'>
						<h3 className='f-bold'>{planName}</h3>
						{optionItens}
					</div>
				</div>
			);
		}

		return optionElm;
	}
	openSubscriptionOptions(e) {
		let id = e.target.dataset.id;
		let name = e.target.dataset.name;
		let address = e.target.dataset.address;
		this.setState({
			subscriptionOption: id + '|' + name + '|' + address
		});
	}
	closeSubscriptionOptions() {
		this.setState({
			subscriptionOption: null
		});
	}
	showAddCupom() {
		this.setState(state => {
			return {
				setCupom: !state.setCupom
			};
		});
	}
	changeCupom(e) {
		let value = e.target.value;

		value = value.toUpperCase();

		this.setState({
			cupomId: value
		});
	}
	getDeliveryAddress() {
		let { Order, Address } = this.props;

		let addressId = Order.data.addressId;
		let addressData = {};

		Address.data.itens.forEach((addressItem, index) => {
			if (addressId === addressItem.addressId) {
				addressData = addressItem;
				addressData.indexPos = index;
			}
		});

		if (!addressData.addressId && addressId === Address.delivery.addressId) {
			addressData = Address.delivery;
		}

		return addressData;
	}
	changeDeliveryAddress() {
		this.setState({
			editDeliveryAddress: true
		});
	}
	closeDeliveryAddress() {
		this.setState({
			editDeliveryAddress: false
		});
	}
	applyDeliveryAddress(addressId) {
		let { Order } = this.props;
		if (addressId) {
			this.props.updateAddressOrder(Order.data.orderId, addressId);
			this.closeDeliveryAddress();
		} else {
			this.props.history.push(process.env.PUBLIC_URL + '/enderecoEntrega');
		}
	}
	render() {
		let { Subscription, Plan, Order, Auth, Cupom, Address } = this.props;

		let orderValue = Order.value;

		let orderTotalPlanValue = '';
		let orderFinalPlanValue = '';
		if (orderValue.total) {
            console.log(orderValue.total);
			this.scroolToBottom();
			orderTotalPlanValue =
				'R$ ' +
				numeral(orderValue.total + Number(orderValue.discount)).format(
					'0,0.00'
				);
			orderFinalPlanValue =
				'R$ ' +
				numeral(orderValue.total + Number(orderValue.delivery)).format(
					'0,0.00'
				);
		}
		let orderDeliveryValue = '';
		if (orderValue.total) {
            if(numeral(orderValue.delivery).format('0,0.00') === '0.00'){
			    orderDeliveryValue ='Frete Grátis';
            } else {
                orderDeliveryValue ='R$ ' + numeral(orderValue.delivery).format('0,0.00');
            }
		}

		let subscriptions = Subscription.data.itens.map((item, key) => {
			return (
				<li key={key}>
					<button
						className='cards-item'
						onClick={this.openSubscriptionOptions}
						data-id={item.subscriptionId}
						data-address={item.addressId}
						data-name={item.name}>
						{item.name}
					</button>
				</li>
			);
		});

		let planSelected = '';
		let planName = <td></td>;
		if (!Plan.list.length && Auth.login.logged) {
			this.props.getPlanList();
		} else if (Order.data.planId) {
			planSelected = Order.data.planId;
			if (!orderValue.total) {
				this.props.getOrderValue(Order.data.orderId);
			}

			let subscriptionCount = Subscription.data.itens.length;
			let planData = this.findPlanById(Order.data.planId);
			let installmentValue = orderValue.total / planData.numberOfInstallment;
			if (planData) {
				let installmentInfo = '';

				if (planData.numberOfInstallment > 1) {
					installmentInfo = (
						<small>
							Em até {planData.numberOfInstallment}x de R${' '}
							{numeral(installmentValue).format('0,0.00')}
						</small>
					);
				}

				planName = (
					<td>
						{subscriptionCount}x {planData.name}
						<br />
						{installmentInfo}
					</td>
				);
			}
		}

		let plans = [];

		if (!Plan.list.error) {
			plans = Plan.list.map(item => {
				return (
					<option key={item.planId} value={item.planId}>
						{item.name}
					</option>
				);
			});
		}

		let errorElm = null;

		if (this.state.planError) {
			errorElm = (
				<div className='overlay'>
					<div className='overlay-box'>
						<div className='overlay-box--content'>
							<p>Selecione o período da sua assinatura.</p>
						</div>
						<button
							className='overlay-box--close f-bold'
							onClick={this.planErrorAccept}>
							Ok, entendi
						</button>
					</div>
				</div>
			);
		}

		if (Cupom.data.error) {
			errorElm = (
				<div className='overlay'>
					<div className='overlay-box'>
						<div className='overlay-box--content'>
							<p>Não foi possível aplicar o desconto.</p>
						</div>
						<button
							className='overlay-box--close f-bold'
							onClick={this.props.clearCupomError}>
							Ok, entendi
						</button>
					</div>
				</div>
			);
		}

		let addCupom = '';
		if (this.state.setCupom) {
			addCupom = (
				<div className='form-group'>
					<input
						type='text'
						className='form-control'
						placeholder='Código do Cupom'
						onChange={this.changeCupom}
						value={this.state.cupomId}
					/>
					<button className='apply-code' onClick={this.applyCupom}>
						Aplicar
					</button>
				</div>
			);
		}

		let cupomValue = (
			<tr>
				<td></td>
			</tr>
		);

		if (Cupom.data.cupomId) {
            if(numeral(orderValue.delivery).format('0,0.00') === '0.00'){
			    cupomValue = (
				<tr>
					<td>
						CUPOM: <strong>{Cupom.data.cupomId}</strong>
					</td>
					<td>Frete Grátis</td>
				</tr>
			);
            } else {
                cupomValue = (
				<tr>
					<td>
						CUPOM: <strong>{Cupom.data.cupomId}</strong>
					</td>
					<td>- R$ {numeral(orderValue.discount).format('0,0.00')}</td>
				</tr>
			);
            }
		}

		let priceTable = null;

		if (orderFinalPlanValue) {
			priceTable = (
				<div>
					<table cellPadding={0} cellSpacing={0}>
						<tbody>
							<tr>
								{planName}
								<td>{orderTotalPlanValue}</td>
							</tr>
							<tr>
								<td>Taxa de entrega</td>
								<td>{orderDeliveryValue}</td>
							</tr>
							{cupomValue}
							<tr>
								<td>TOTAL</td>
								<td>{orderFinalPlanValue}</td>
							</tr>
						</tbody>
					</table>
					<button className='coupon-add' onClick={this.showAddCupom}>
						Adicionar cupom
					</button>
				</div>
			);
		}

		let deliveryAddressData = this.getDeliveryAddress();

		let deliveryAddress = '';

		if (this.state.editDeliveryAddress) {
			let addressButtons = [];

			Address.data.itens.forEach((addressItem, index) => {
				let disabled =
					deliveryAddressData.addressId === addressItem.addressId
						? { disabled: 'disabled' }
						: {};

				let SubscriptionDataItem = Subscription.data.itens[index];

				addressButtons.push(
					<button
						key={index}
						onClick={() => this.applyDeliveryAddress(addressItem.addressId)}
						{...disabled}>
						{SubscriptionDataItem.name}
						<br />
						<small>{addressItem.address}</small>
					</button>
				);
			});

			addressButtons.push(
				<button
					key={addressButtons.length}
					onClick={() => this.applyDeliveryAddress()}>
					Outro
				</button>
			);
			addressButtons.push(
				<button key={addressButtons.length} onClick={this.closeDeliveryAddress}>
					Cancelar
				</button>
			);

			deliveryAddress = (
				<div className='overlay'>
					<div className='overlay-box'>
						<h3 className='f-bold'>Endereço de Entrega</h3>
						{addressButtons}
					</div>
				</div>
			);
		}

		let deliveryInfo = '';

		let deliverySubscriptionData = {};

		if (deliveryAddressData.indexPos) {
			deliverySubscriptionData =
				Subscription.data.itens[deliveryAddressData.indexPos];
		}

		if (deliveryAddressData && deliverySubscriptionData) {
			let deliveryStreet = '';

			if (deliverySubscriptionData.name) {
				deliveryStreet = <small>{deliveryAddressData.address}</small>;
			}

			deliveryInfo = (
				<div className='row'>
					<div className='boxAddress'>
						<h4>Endereço de entrega</h4>
						<p>
							{deliverySubscriptionData.name || deliveryAddressData.address}
						</p>
						{deliveryStreet}
						<button
							className='button-change'
							onClick={this.changeDeliveryAddress}>
							Alterar
						</button>
					</div>
				</div>
			);
		}

		return (
			<div className='form-wrapper'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xs-12 col-md-offset-3 col-md-9'>
							<div className='form-step form-step-3'>
								{/* <div className="overlay">
											<div className="overlay-box">
												<div className="overlay-box--content">
													<h3 className="f-bold">Adicione outros beneficiários</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium facilis earum odio, provident! Exercitationem, iste sint expedita ullam sed veniam magnam nesciunt, est voluptates, quod vel eaque inventore nam quo?</p>
												</div>
												<button className="overlay-box--close f-bold">Ok, entendi</button>
											</div>
										</div> */}
								{deliveryAddress}
								{errorElm}
								<div className='checkout checkout-1'>
									<div className='form-wiz'>
										<ul>
											<li className='transparent'>
												<span className='f-bold dot'>1</span>{' '}
												<span className='dot-text'>Beneficiário</span>
											</li>
											<li className='transparent'>
												<span className='f-bold dot'>2</span>{' '}
												<span className='dot-text'>Endereço</span>
											</li>
											<li>
												<span className='dot-text'>Checagem</span>{' '}
												<span className='f-bold dot'>3</span>
											</li>
										</ul>
									</div>
									<div className='checkout-items'>
										<h3>Seus cartões:</h3>
										<ul className='cards'>
											{this.subscriptionOptions()}
											{subscriptions}
										</ul>
										<Link to='beneficiario' className='benefits-add'>
											Adicionar mais um beneficiário
										</Link>
										<div className='row'>
											<div className='gray'>
												<div className='row'>
													<div className='col-xs-12 col-md-6'>
														<div className='form-group form-select'>
															<select
																className='form-control'
																onChange={this.setOrderPlan}
																value={planSelected}>
																<option value=''>Período da Assinatura</option>
																{plans}
															</select>
														</div>
														<br />
														{deliveryInfo}
													</div>
													<div className='col-xs-12 col-md-6'>
														<div className='checkout-resume'>
															{priceTable}
															{addCupom}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='row'>
									<button
										className='f-bold button-sticky go-step-4'
										onClick={this.goPayment}>
										Finalizar compra
									</button>
								</div>
							</div>
						</div>
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
			getPlanList,
			setPlanOrder,
			getOrderValue,
			removeSubscription,
			addEditSubscription,
			applyCupom,
			clearCupomError,
			updateAddressOrder
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Carrinho);
