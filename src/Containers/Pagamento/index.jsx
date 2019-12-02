import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormCreditCard from '../../Components/FormCreditCard';
import Loading from '../../Components/Loading';
import erroImg from '../../img/Iconecartaoquebrado.png';
import alertImg from '../../img/Iconealerta.png';

import {
	setCreditPayment,
	setBoletoPayment
} from '../../_redux/actions/payment';

class Pagamento extends Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			error: null,
			errorFunc: null,
			termos: false
		};

		this.sendPayment = this.sendPayment.bind(this);
		this.formData = this.formData.bind(this);
		this.sendPayment = this.sendPayment.bind(this);
		this.sendPaymentBoleto = this.sendPaymentBoleto.bind(this);
		this.errorAccept = this.errorAccept.bind(this);
		this.changeTerm = this.changeTerm.bind(this);
	}
	componentDidMount() {
		let { Order } = this.props;
		if (!Order.data.orderId) {
			window.location = '/loja/';
		}
	}
	sendPayment() {
		let { Order } = this.props;
		if (this.state.termos) {
			if (Order.data.orderId && !this.checkData(this.data)) {
				this.setState({
					loading1: true
				});
				var valida = 'falso';
				//this.props.setCreditPayment(Order.data.orderId, [this.data], valida);
				var pagamentoId = this.props.setCreditPayment(Order.data.orderId, [this.data], valida);
				pagamentoId.then( (valor) =>{ 
				var count = 0;
				var intervalID = this.interval = setInterval(() => {
					valida = 'verdadeiro';
					var result = this.props.setCreditPayment(valor, [this.data], valida);
					result.then( (valor) => {

						console.log(valor);

						if(valor === 'true') {
							this.setState({
								loading1: false,
                                title: 'Erro no cartão!',
								error: 'Não conseguimos processar seu cartão. Favor revisar os dados preenchidos ou trocar a forma de pagamento. Caso continue com o mesmo problema, favor ligar para 0800 591 0697, de segunda a sexta-feira, das 09:00 as 18:00.',
							});
							clearInterval(intervalID);
						}

						else if (valor === 'true1'){
							this.setState({
								loading1: false,
                                title: 'Erro no pagamento!',
								error1: 'Cartão Inválido. Favor revisar os dados preenchidos e tentar novamente. Caso continue com o mesmo problema, favor ligar para 0800 591 0697, de segunda a sexta-feira, das 09:00 as 18:00.',
							});
							clearInterval(intervalID);

						}else if(valor === 'false'){
							clearInterval(intervalID);
						   this.props.history.push(process.env.PUBLIC_URL + '/sucesso');
						}

					})
					
					count++
					if (count === 12) {
						clearInterval(intervalID);
					   this.props.history.push(process.env.PUBLIC_URL + '/sucesso');				
					}


				}, 6000);


			});
			} else {
				this.setState({
                    title: 'Erro no cartão!',
					error: 'Não conseguimos processar seu cartão. Favor revisar os dados preenchidos ou trocar a forma de pagamento. Caso continue com o mesmo problema, favor ligar para 0800 591 0697, de segunda a sexta-feira, das 09:00 as 18:00.',
				});
			}
		} else {
			this.setState({
				error: 'É necessário aceitar os termos para continuar'
			});
		}
	}
	sendPaymentBoleto() {
		if (this.state.termos) {
			let { Order } = this.props;
			if (Order.data.orderId) {
				this.setState({
					loading: true
				});
				this.props.setBoletoPayment(Order.data.orderId);
			} else {
				this.setState({
					error: 'Houve um erro inesperado, favor tente novamente',
				});
			}
		} else {
			this.setState({
				error: 'É necessário aceitar os termos para continuar'
			});
		}
	}
	formData(data) {
		this.data = data;
	}
	checkData(data) {
		let checkField = {
			cardNumber: {
				regex: /^([0-9]{4}\s?){4}$/i,
				errorMsg: 'Número do cartão inválido'
			},
			cardName: {
				regex: /^([a-zA-ZÀ-ú]+\s?)+$/i,
				errorMsg: 'Nome do cartão inválido'
			},
			cardExpirationMonth: {
				regex: /^([0-9]{1,2})$/i,
				errorMsg: 'Validade do cartão inválido'
			},
			cardExpirationYear: {
				regex: /^([0-9]{4})$/i,
				errorMsg: 'Validade do cartão inválido'
			},
			cardCVV: {
				regex: /^([0-9]{3,4})$/i,
				errorMsg: 'CVV do cartão inválido'
			}
		};

		let error = false;

		for (var fieldName in checkField) {
			if (!checkField[fieldName].regex.test(data[fieldName])) {
				error = true;

				this.setState({
					error: checkField[fieldName].errorMsg
				});
			}
		}

		return error;
	}
	errorAccept() {
		if (this.state.errorFunc) {
			this.state.errorFunc();
		}
		this.setState({
			error: null,
			error1: null,
			errorFunc: null
		});
	}
	getPlanData(planId) {
		let { Plan } = this.props;

		let planData = {};

		Plan.list.forEach(planItem => {
			if (planItem.planId === planId) {
				planData = planItem;
			}
		});

		return planData;
	}
	changeTerm(e) {
		this.setState({
			termos: e.target.checked
		});
	}
	render() {
		let { Payment, Order } = this.props;

		if (Payment.data.paymentId) { 
            console.log(Order.data.planId);
            if(Payment.data.paymentMethod === "boleto") {
                if( Order.data.planId === '1') {
                    this.props.history.push(process.env.PUBLIC_URL + '/sucesso');
                }
                else {
                   if(Payment.data.boletoPDF === null) {
                    this.props.history.push(process.env.PUBLIC_URL + '/erro');
                }
                
                else {
                    this.props.history.push(process.env.PUBLIC_URL + '/sucesso');
                } 
                }
			}
			
            // else {
            //     if(Payment.data.status === "failed" ){
            //         this.props.history.push(process.env.PUBLIC_URL + '/erro');
            //     }
            //     else {
            //         this.props.history.push(process.env.PUBLIC_URL + '/sucesso');
            //     }
			// }
			
		}
        

		let totalValue = Number(Order.value.total) + Number(Order.value.delivery);

		let planData = this.getPlanData(Order.data.planId);

		let fieldError = '';
		if (this.state.error) {
			fieldError = (
				<div className='overlay'>
					<div className='overlay-box'>
						<div className='overlay-box--content'>
							<img src={alertImg} alt='Erro' className='img-responsive' />
                            <h2>{this.state.title}</h2><br/>
							<p>{this.state.error}</p>
						</div>
						<button
							className='overlay-box--close f-bold'
							onClick={this.errorAccept}>
							Ok, tentar novamente
						</button>
					</div>
				</div>
			);
		}
        else if (this.state.error1) {
			fieldError = (
				<div className='overlay'>
					<div className='overlay-box'>
						<div className='overlay-box--content'>
							<img src={erroImg}  alt='Erro' className='img-responsive' />
                            <h2>{this.state.title}</h2><br/>
							<p>{this.state.error1}</p>
						</div>
						<button
							className='overlay-box--close f-bold'
							onClick={this.errorAccept}>
							Ok, tentar novamente
						</button>
					</div>
				</div>
			);
		}

		return (
			<div className='form-wrapper'>
				<Loading show={this.state.loading}></Loading>
				<Loading show1={this.state.loading1}></Loading>
				{fieldError}
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xs-12 col-md-offset-3 col-md-9'>
							<div className='form-step form-step-5'>
								{/* <div class="overlay">
											<div class="overlay-box">
												<div class="overlay-box--content">
													<h3 class="f-bold">Falta pouco</h3>
													<p>Escolha um endereço para receber seus cartões.</p>
												</div>
												<button class="overlay-box--close f-bold">Inserir endereço de entrega</button>
											</div>
										</div> */}
								<div className='checkout checkout-2'>
									<div className='checkout-title checkout-cart'>
										<h4>Escolha como quer pagar:</h4>
									</div>
									<div>
										<h3 className='visible-md visible-lg pay-title-desktop'>
											Escolha como quer pagar:
										</h3>
										<ul className='nav nav-tabs' role='tablist'>
											<li role='presentation' className='active'>
												<a
													href='#cartao'
													aria-controls='cartao'
													role='tab'
													data-toggle='tab'>
													Cartão
												</a>
											</li>
											<li role='presentation'>
												<a
													href='#boleto'
													aria-controls='boleto'
													role='tab'
													data-toggle='tab'>
													Boleto
												</a>
											</li>
										</ul>
										<div className='tab-content'>
											<FormCreditCard
												onData={this.formData}
												onSend={this.sendPayment}
												installments={planData.numberOfInstallment}
												totalValue={totalValue}											
												></FormCreditCard>
											<div role='tabpanel' className='tab-pane' id='boleto'>
												<h3>Informações de pagamento</h3>
												<p>
													Ao optar pela forma de pagamento por boleto precisamos
													apenas lembrá-lo(a) que sua assinatura YALO estará
													ativa apenas após a confirmação do pagamento, tudo
													bem?
													<br />
													<br />
													Fique tranquilo, somos notificados geralmente um dia
													útil após o seu pagamento e, quando isso acontecer,
													vamos te mandar um e-mail comunicando a ativação dos
													seus benefícios!
												</p>
												<div className='row'>
													<button
														className='f-bold button-sticky'
														onClick={this.sendPaymentBoleto}>
														Emitir boleto
													</button>
												</div>
											</div>
										</div>

										<div className='form-group form-terms'>
											<label>
												<input
													type='checkbox'
													required
													name='termos1'
													onChange={this.changeTerm}
												/>
												<span>Declaro que li e estou de acordo com os </span>
												<a
													href='https://yalo.com.br/termos'
													rel='noopener noreferrer'
													target='_blank'>
													Termos e Condições do Produto Yalo Individual
												</a>
												
											</label>
                                            <label>
												<input
													type='checkbox'
													required
													name='termos'
													onChange={this.changeTerm}
												/>
												<span>Declaro que li e estou de acordo com os </span>
												<a
													href='https://yalo.com.br/files/Politica_de_Privacidade_e_Seguranca_Yalo.951f98bf.pdf'
													rel='noopener noreferrer'
													target='_blank'>
													Políticas de Privacidade
												</a>
											</label>
										</div>
									</div>
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
	bindActionCreators({ setCreditPayment, setBoletoPayment }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pagamento);
