import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReactComponent as SucessSymbol } from '../../img/yalo-symbol.svg';
import { ReactComponent as Drc } from '../../img/drconsulta-white.svg';
import card from '../../img/cartao.png';
import { ReactComponent as AppStore } from '../../img/app-store.svg';
import { ReactComponent as PlayStore } from '../../img/google-play.svg';

class Sucesso extends Component {
	render() {
		let { Payment, Subscription } = this.props;
		let successCard = (
			<div className='form-step form-step-6 para-cartao'>
				<div className='row'>
					<div className='success'>
						<div className='success-content'>
							<SucessSymbol className='success-symbol'></SucessSymbol>
							<h2 className='f-bold'>Pagamento realizado com sucesso !</h2>
							<p>
								Recebemos o seu pagamento!<br /> Agora, é só informar o CPF para<br /> pagar R$ 40,00 nas
								consultas do <Drc></Drc>
							</p>
							<br />
							<img src={card} alt='Cartão Yalo' className='img-responsive' />
							<p>Baixe o aplicativo:</p>
							<div className='row'>
								<div className='col-md-offset-3 col-md-6'>
									<div className='row'>
										<div className='col-xs-6'>
											<a
												href='https://itunes.apple.com/BR/app/id1390736078?mt=8'
												target='_blank'
												rel='noopener noreferrer'>
												<AppStore></AppStore>
											</a>
										</div>
										<div className='col-xs-6'>
											<a
												href='https://play.google.com/store/apps/details?id=br.com.yalo.yalo'
												target='_blank'
												rel='noopener noreferrer'>
												<PlayStore></PlayStore>
											</a>
										</div>
									</div>
								</div>
							</div>
							<p>
								<span>Após a confirmação do pagamento o cartão chega em até 10 dias úteis.</span>
							</p>
							<br />
							<a
								href='https://yalo.com.br/'
								className='button-download'>
								Voltar para YALO
							</a>
						</div>
					</div>
				</div>
			</div>
		);
		let quaseCard = (
			<div className='form-step form-step-6 para-cartao'>
				<div className='row'>
					<div className='success'>
						<div className='success-content'>
							<SucessSymbol className='success-symbol'></SucessSymbol>
							<h2 className='f-bold'>Quase lá!</h2>
							<p>
								Recebemos o seu pedido e você será avisado por<br /> e-mail assim que o pagamento for aprovado.<br /> Depois, é só informar o CPF para<br /> pagar R$ 40,00 nas
								consultas do <Drc></Drc>
							</p>
							<br />
							<img src={card} alt='Cartão Yalo' className='img-responsive' />
							<p>Baixe o aplicativo:</p>
							<div className='row'>
								<div className='col-md-offset-3 col-md-6'>
									<div className='row'>
										<div className='col-xs-6'>
											<a
												href='https://itunes.apple.com/BR/app/id1390736078?mt=8'
												target='_blank'
												rel='noopener noreferrer'>
												<AppStore></AppStore>
											</a>
										</div>
										<div className='col-xs-6'>
											<a
												href='https://play.google.com/store/apps/details?id=br.com.yalo.yalo'
												target='_blank'
												rel='noopener noreferrer'>
												<PlayStore></PlayStore>
											</a>
										</div>
									</div>
								</div>
							</div>
							<p>
								<span>Após a confirmação do pagamento o cartão chega em até 10 dias úteis.</span>
							</p>
							<br />
							<a
								href='https://yalo.com.br/'
								className='button-download'>
								Voltar para YALO
							</a>
						</div>
					</div>
				</div>
			</div>
		);

		let boletoBtn = '';
		if (Payment.data.boletoPDF) {
			boletoBtn = (
				<div>
					<br />
					<a
						href={Payment.data.boletoPDF}
						className='button-download'
						target='_blank'
						rel='noopener noreferrer'>
						Ver Boleto
					</a>
				</div>
			);
		}

		let sendedEmail = '';
		if (Subscription.data.itens.length) {
			sendedEmail = Subscription.data.itens[0].email;
		}

		let successBoleto = (
			<div className='form-step form-step-6 para-boleto'>
				<div className='row'>
					<div className='success'>
						<div className='success-content'>
							<SucessSymbol className='success-symbol'></SucessSymbol>
							<h2 className='f-bold'>Quase lá!</h2>
							<p>
								Após a confirmação do pagamento do boleto é só o assinante
								informar o CPF para pagar<br /> R$ 40,00 nas consultas do <Drc></Drc>
								<br />
								Boleto enviado para: {sendedEmail}
							</p>
							{boletoBtn}
							<br />
							<img src={card} alt='Cartão Yalo' className='img-responsive' />
							<p>Baixe o aplicativo:</p>
							<div className='row'>
								<div className='col-md-offset-3 col-md-6'>
									<div className='row'>
										<div className='col-xs-6'>
											<a
												href='https://itunes.apple.com/BR/app/id1390736078?mt=8'
												target='_blank'
												rel='noopener noreferrer'>
												<AppStore></AppStore>
											</a>
										</div>
										<div className='col-xs-6'>
											<a
												href='https://play.google.com/store/apps/details?id=br.com.yalo.yalo'
												target='_blank'
												rel='noopener noreferrer'>
												<PlayStore></PlayStore>
											</a>
										</div>
									</div>
								</div>
							</div>
							<p>
								<span>
									Após a confirmação do pagamento o cartão chega em até 10 dias
									úteis.
								</span>
							</p>
							<br />
							<a
								href='https://yalo.com.br/'
								className='button-download'>
								Voltar para YALO
							</a>
						</div>
					</div>
				</div>
			</div>
		);

		let successReponse = '';
		if (Payment.data.paymentMethod === 'boleto') {
			successReponse = successBoleto;
		} else if(Payment.data.status === 'paid') {
			successReponse = successCard;
		}
		else {
			successReponse = quaseCard;
		}
		return (
			<div className='form-wrapper'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xs-12 col-md-offset-3 col-change col-md-9'>
							{successReponse}
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

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sucesso);
