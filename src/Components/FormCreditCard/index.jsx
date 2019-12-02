import React, { Component } from 'react';

import InputMask from 'react-input-mask';

import numeral from 'numeral';

class FormCreditCard extends Component {
	constructor() {
		super();

		this.state = {
			cardNumber: '',
			cardName: '',
			cardExpirationMonth: '',
			cardExpirationYear: '',
			cardCVV: '',
			numberOfInstallment: ''
		};

		this.setField = this.setField.bind(this);
	}
	componentDidMount() {
		if (this.props.installments) {
			this.setState({
				numberOfInstallment: this.props.installments
			});
		}
	}
	removeAcento(text) {
		text = text.replace(new RegExp('[ÁÀÂÃ]', 'g'), 'A');
		text = text.replace(new RegExp('[ÉÈÊ]', 'g'), 'E');
		text = text.replace(new RegExp('[ÍÌÎ]', 'g'), 'I');
		text = text.replace(new RegExp('[ÓÒÔÕ]', 'g'), 'O');
		text = text.replace(new RegExp('[ÚÙÛ]', 'g'), 'U');
		text = text.replace(new RegExp('[Ç]', 'g'), 'C');
		text = text.replace(new RegExp('[áàâã]', 'g'), 'a');
		text = text.replace(new RegExp('[éèê]', 'g'), 'e');
		text = text.replace(new RegExp('[íìî]', 'g'), 'i');
		text = text.replace(new RegExp('[óòôõ]', 'g'), 'o');
		text = text.replace(new RegExp('[úùû]', 'g'), 'u');
		text = text.replace(new RegExp('[ç]', 'g'), 'c');

		return text;
	}
	setField(e) {
		let value = e.target.value;
		let name = e.target.getAttribute('name');

		let stateObj = {};
		if (name === 'cardExpiry') {
			let splitValue = value.split('/');
			stateObj['cardExpirationMonth'] = splitValue[0];
			stateObj['cardExpirationYear'] = '20' + splitValue[1];
			this.setState(stateObj);
		} else if (name === 'cardName') {
			stateObj[name] = this.removeAcento(value);
			this.setState(stateObj);
		} else {
			stateObj[name] = value;
			this.setState(stateObj);
		}
	}
	render() {
		this.props.onData(this.state);

		let installments = [];
		var totalValue = this.props.totalValue;
		for (let i = 0; i < this.props.installments; i++) {
			var value = i + 1;
			var label = '';
			var installmentValue = totalValue / value;
			if (value === 1) {
				label =
					'Crédito à vista - 1x de R$ ' +
					numeral(installmentValue).format('0,0.00');
			} else {
				label =
					`Parcelado em ${value}x de R$ ` +
					numeral(installmentValue).format('0,0.00') +
					` sem juros`;
			}

			let props = {};

			installments.push(
				<option key={i} value={value} {...props}>
					{label}
				</option>
			);
		}

		let installmentElm = '';

		if (installments.length > 1) {
			installmentElm = (
				<div className='form-group form-select'>
					<select
						className='form-control'
						name='numberOfInstallment'
						onChange={this.setField}
						defaultValue={this.props.installments}>
						<option value=''>Parcelamento</option>
						{installments}
					</select>
				</div>
			);
		}

		return (
			<div role='tabpanel' className='tab-pane active' id='cartao'>
				{/* <div class="overlay">
							<div class="overlay-box">
								<div class="overlay-box--content">
									<p>Você precisa preencher todos os campos para avançar.</p>
								</div>
								<button class="overlay-box--close f-bold">Ok, entendi</button>
							</div>
						</div> */}
				<div className='form-group'>
					<input
						type='text'
						className='form-control'
						required
						id='cardnome'
						name='cardName'
						onChange={this.setField}
					/>
					<label htmlFor='cardnome'>Nome completo</label>
				</div>
				<p>
					<small>Idêntico ao cartão.</small>
				</p>
				<div className='form-group'>
					<InputMask
						type='text'
						className='form-control'
						required
						id='cardnumber'
						name='cardNumber'
						onChange={this.setField}
						mask='9999 9999 9999 9999'
						maskChar='_'
					/>
					<label htmlFor='cardnumber'>Número do cartão</label>
				</div>
				<div className='form-group'>
					<InputMask
						type='text'
						className='form-control'
						required
						id='cardexpiry'
						name='cardExpiry'
						onChange={this.setField}
						mask='99/99'
						maskChar='_'
					/>
					<label htmlFor='cardexpiry'>Validade</label>
				</div>
				<div className='form-group'>
					<input
						type='text'
						className='form-control'
						required
						id='cardcvv'
						name='cardCVV'
						onChange={this.setField}
					/>
					<label htmlFor='cardcvv'>CVV</label>
				</div>
				{installmentElm}
				<div className='row'>
					<button
						className='f-bold button-sticky go-success'
						onClick={this.props.onSend}>
						Concluir
					</button>
				</div>
			</div>
		);
	}
}

export default FormCreditCard;
