import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

class EditarEndereco extends Component {
	render() {
		return (
			<div className='form-wrapper'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xs-12 col-md-offset-3 col-md-9'>
							<div className='form-step form-step-7'>
								<div className='checkout checkout-2'>
									<div className='checkout-title checkout-cart'>
										<h4>Editar</h4>
										<Link tp='#' className='icon-back close-step-7'>
											Voltar
										</Link>
									</div>
									<div className='checkout-items'>
										<h3>Dados do Beneficiário:</h3>
										<p>Form dados pessoais</p>
										<p>Form endereço de cobrança</p>
									</div>
								</div>
								<div className='row'>
									<button className='f-bold button-sticky'>Salvar</button>
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

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditarEndereco);
