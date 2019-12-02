import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReactComponent as SucessSymbol } from '../../img/yalo-symbol.svg';
import erroImg from '../../img/error.png';

class Erro extends Component {
	render() {
        let { Payment } = this.props;
		let erroCard = (
			<div className='form-step form-step-6 para-cartao'>
				<div className='row'>
					<div className='success'>
						<div className='success-content'>
							<SucessSymbol className='success-symbol'></SucessSymbol>
							<h2 className='f-bold'>Desculpe, tivemos um problema!</h2>
							<p>
								Tivemos um pequeno problema no processo de pagamento, por favor tente em alguns instantes ou ligue para nossa central de atendimento:
                                <br />
								0800 591 0697
							</p>
							<br />
							<img src={erroImg} alt='Erro' className='img-responsive' />
							<br /><br />
							<a
								href='https://yalo.com.br/loja'
								className='button-download'>
								Voltar para YALO
							</a>
						</div>
					</div>
				</div>
			</div>
		);
		let erroBoleto = (
			<div className='form-step form-step-6 para-boleto'>
				<div className='row'>
					<div className='success'>
						<div className='success-content'>
							<SucessSymbol className='success-symbol'></SucessSymbol>
							<h2 className='f-bold'>Desculpe, tivemos um problema!</h2>
							<p>
								Desculpe, tivemos um problema ao geração o boleto, por favor tente dentro de instantes ou ligue para:
								<br />
								0800 591 0697
							</p>
							<br />
							<img src={erroImg} alt='Erro' className='img-responsive' />
							<br /><br />
							<a
								href='https://yalo.com.br/loja'
								className='button-download'>
								Voltar para YALO
							</a>
						</div>
					</div>
				</div>
			</div>
		);

		let erroReponse = '';
		if (Payment.data.paymentMethod === 'boleto') {
			erroReponse = erroBoleto;
		} else {
			erroReponse = erroCard;
		}
		return (
			<div className='form-wrapper'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xs-12 col-md-offset-3 col-change col-md-9'>
							{erroReponse}
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
)(Erro);
