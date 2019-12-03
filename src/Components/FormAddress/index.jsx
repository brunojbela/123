import React, { Component } from 'react';

import InputMask from 'react-input-mask';
import axios from 'axios';

class FormAddress extends Component {
	constructor() {
		super();

		this.state = {
			inputData: {
				cep: '',
				address: '',
				district: '',
				number: '',
				complement: '',
				state: '',
				city: ''
			}
		};

		this.setField = this.setField.bind(this);
	}
	componentWillMount() {
		if (this.props.initialData) {
			let inputData = { ...this.state.inputData };
			let initialData = this.formatFields(this.props.initialData);

			inputData.cep = initialData.cep || '';
			inputData.address = initialData.address || '';
			inputData.district = initialData.district || '';
			inputData.number = initialData.number || '';
			inputData.complement = initialData.complement || '';
			inputData.state = initialData.state || '';
			inputData.city = initialData.city || '';

			this.setState({
				inputData
			});
		}
	}
	formatFields(data) {
		for (var fieldName in data) {
			switch (fieldName) {
				case 'cep':
					data[fieldName] = data[fieldName].padStart(8, '0');
					data[fieldName] = data[fieldName].replace(
						/^([0-9]{5})([0-9]{3})$/i,
						'$1-$2'
					);
					break;
				default: 
			}
		}

		return data;
	}
	getErrorMsg(name) {
		let errorMsgs = {
			cep: 'CEP inválido',
			address: 'Logradouro inválido',
			district: 'Bairro inválido',
			number: 'Número inválido',
			state: 'Estado inválido',
			city: 'Cidade inválida'
		};

		return errorMsgs[name];
	}
	checkField(name, value) {
		let fieldChecked = false;
		let checkField = {
			cep: /^[0-9]{5}-[0-9]{3}$/i,
			address: /^([A-Za-z0-9çãàáâéêíóôõúÂÃÁÀÉÊÍÓÔÕÚÇ()"'!?$%:;,º°ª]+\s?){1,100}$/i,
			district: /^([^\d\s]+\s?){1,30}$/i,
			number: /^[0-9]{1,8}$/i,
			city: /^([^\d\s]+\s?){1,30}$/i,
			state: /^[A-Z]{2}$/
		};
		if (checkField[name]) {
			fieldChecked = checkField[name].test(value);
		} else {
			fieldChecked = true;
		}

		return fieldChecked;
	}
	setCep(value) {
		let cep = value.replace('-', '');
		axios.get(`//viacep.com.br/ws/${cep}/json/`).then(response => {
			if (response.status === 200) {
				let addressData = response.data;

				let inputData = { ...this.state.inputData };

				inputData.cep = addressData.cep;
				inputData.address = addressData.logradouro;
				inputData.district = addressData.bairro;
				inputData.city = addressData.localidade;
				inputData.state = addressData.uf;

				this.setState({
					inputData
				});

				this.updateFields();
			}
		});
	}
	updateFields() {
		for (let fieldName in this.state.inputData) {
			let stateObj = {};
			let fieldValue = this.state.inputData[fieldName];
			if (this.checkField(fieldName, fieldValue)) {
				stateObj[fieldName] = {
					error: false,
					value: fieldValue
				};
			} else {
				stateObj[fieldName] = {
					error: true,
					msg: this.getErrorMsg(fieldName)
				};
			}
			this.setState(stateObj);
		}
	}
	setField(e) {
		let value = e.target.value;
		let name = e.target.getAttribute('name');

		value = value.replace(/_$/g, '');

		if (name === 'cep' && this.checkField(name, value)) {
			this.setCep(value);
		}

		let inputData = { ...this.state.inputData };

		inputData[name] = value;
		this.setState({
			inputData
		});
	}
	getData() {
		let inputData = this.state.inputData;

		let dataSend = {};
		for (var fieldName in inputData) {
			if (this.checkField(fieldName, inputData[fieldName])) {
				dataSend[fieldName] = {
					error: false,
					value: inputData[fieldName]
				};
			} else {
				dataSend[fieldName] = {
					error: true,
					msg: this.getErrorMsg(fieldName)
				};
			}
		}

		return dataSend;
	}
	render() {
		let fieldError = '';
		if (this.props.error) {
			fieldError = (
				<div className='overlay'>
					<div className='overlay-box'>
						<div className='overlay-box--content'>
							<p>{this.props.error}</p>
						</div>
						<button
							className='overlay-box--close f-bold'
							onClick={this.props.errorAccept}>
							Ok, entendi
						</button>
					</div>
				</div>
			);
		}

		this.props.onData(this.getData());

		return (
			<div className='col-xs-12 col-md-offset-3 col-md-9'>
				<div className='form-step form-step-2'>
					{fieldError}
					<div className='form-wiz'>
						<ul>
							<li className='transparent'>
								<span className='f-bold dot'>1</span>{' '}
								<span className='dot-text'>Beneficiário</span>
							</li>
							<li>
								<span className='f-bold dot'>2</span>{' '}
								<span className='dot-text'>Endereço</span>
							</li>
						</ul>
					</div>
					<div className='form-title'>
						<h2>Endereço do beneficiário:</h2>
					</div>
					{/* Formulário de endereço */}
					<div className='row'>
						<div className='col-xs-12 col-md-4'>
							<div className='form-group'>
								<InputMask
									type='text'
									className='form-control'
									required
									id='cepcobranca'
									name='cep'
									onChange={this.setField}
									mask='99999-999'
									maskChar=''
									value={this.state.inputData.cep}
								/>
								<label htmlFor='cepcobranca'>CEP</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-8'>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									required
									id='logradourocobranca'
									name='address'
									onChange={this.setField}
									value={this.state.inputData.address}
								/>
								<label htmlFor='logradourocobranca'>Logradouro</label>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-xs-12 col-md-4'>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									required
									id='bairrocobranca'
									name='district'
									onChange={this.setField}
									value={this.state.inputData.district}
								/>
								<label htmlFor='bairrocobranca'>Bairro</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-3'>
							<div className='form-group'>
								<InputMask
									type='text'
									className='form-control'
									required
									id='numerocobranca'
									name='number'
									mask='99999'
									maskChar=''
									onChange={this.setField}
									value={this.state.inputData.number}
								/>
								<label htmlFor='numerocobranca'>Número</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-5'>
							<div className='form-group'>
								<input
									maxLength="20"
									type='text'
									className='form-control'
									required
									id='complementocobranca'
									name='complement'
									onChange={this.setField}
									value={this.state.inputData.complement}
								/>
								<label htmlFor='complementocobranca'>Complemento</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-6'>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									required
									id='city'
									name='city'
									onChange={this.setField}
									value={this.state.inputData.city}
								/>
								<label htmlFor='city'>Cidade</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-6'>
							<div className='form-group select-new'>
								<select
									type='text'
									className='form-control no-border'
									required
									id='state'
									name='state'
									onChange={this.setField}
									value={this.state.inputData.state}>
									<option></option>
									<option value='AC'>Acre</option>
									<option value='AL'>Alagoas</option>
									<option value='AP'>Amapá</option>
									<option value='AM'>Amazonas</option>
									<option value='BA'>Bahia</option>
									<option value='CE'>Ceará</option>
									<option value='DF'>Distrito Federal</option>
									<option value='ES'>Espírito Santo</option>
									<option value='GO'>Coiás</option>
									<option value='MA'>Maranhão</option>
									<option value='MT'>Mato Grosso</option>
									<option value='MS'>Mato Grosso do Sul</option>
									<option value='MG'>Minas Gerais</option>
									<option value='PA'>Pará</option>
									<option value='PB'>Paraíba</option>
									<option value='PR'>Paraná</option>
									<option value='PE'>Pernambuco</option>
									<option value='PI'>Piauí</option>
									<option value='RJ'>Rio de Janeiro</option>
									<option value='RN'>Rio Grande do Norte</option>
									<option value='RS'>Rio Grande do Sul</option>
									<option value='RO'>Rondônia</option>
									<option value='RR'>Roraima</option>
									<option value='SC'>Santa Catarina</option>
									<option value='SP'>São Paulo</option>
									<option value='SE'>Sergipe</option>
									<option value='TO'>Tocantins</option>
								</select>
								<label htmlFor='gender'>Estado</label>
							</div>
						</div>
					</div>
					{/* # Formulário de endereço */}
				</div>
			</div>
		);
	}
}

export default FormAddress;

