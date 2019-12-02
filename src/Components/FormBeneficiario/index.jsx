import React, { Component } from 'react';

import InputMask from 'react-input-mask';
import cpfCheck from 'cpf-check';
import moment from 'moment';

class FormBeneficiario extends Component {

	constructor() {
		super();

		this.state = {
			inputData: {
				name: '',
				cpf: '',
				phone: '',
				birthday: '',
				gender: '',
				email: ''
			}
		};

		this.setField = this.setField.bind(this);
	}
	componentWillMount() {
		if (this.props.initialData) {
			let inputData = { ...this.state.inputData };
			let initialData = this.formatFields(this.props.initialData);

			inputData.name = initialData.name || '';
			inputData.cpf = initialData.cpf || '';
			inputData.phone = initialData.phone || '';
			inputData.birthday = initialData.birthday || '';
			inputData.gender = initialData.gender || '';
			inputData.email = initialData.email || '';

			this.setState({
				inputData
			});
		}
	}
	componentDidMount() {
		if (window.jQuery) {
			let $ = window.jQuery;

			$('[data-toggle="tooltip"]').tooltip();
		}
	}
	formatFields(data) {
		for (var fieldName in data) {
			switch (fieldName) {
				case 'cpf':
					data[fieldName] = data[fieldName].replace(
						/^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})$/i,
						'$1.$2.$3-$4'
					);
					break;
				case 'phone':
					data[fieldName] = data[fieldName].replace(
						/^([0-9]{2})([0-9]{4})([0-9]{4,5})$/i,
						'($1) $2-$3'
					);
					break;
				case 'birthday':
					data[fieldName] = data[fieldName].replace(
						/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/i,
						'$3/$2/$1'
					);
          break;
				default:
			}
		}

		return data;
	}
	getErrorMsg(name) {
		let errorMsgs = {
			name: 'Nome inválido',
			cpf: 'CPF inválido',
      cpfDuplicate: 'Beneficiário em duplicidade',
			phone: 'Telefone inválido',
			birthday: 'Data de nascimento inválida',
			gender: 'Gênero inválido',
			email: 'E-mail inválido'
		};

		return errorMsgs[name];
	}


	checkField(name, value) {
		let isValidField = false;
		let checkField = {
			name: /^([^\d\s]+)\s([^\d\s]+).*$/i,
			cpf: /^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}/,
			phone: /^\([0-9]{2}\)\s[0-9]{4}-[0-9]{4,5}$/,
			birthday: /^([0-9]{2}\/){2}[0-9]{4}$/i,
			gender: /^(Male|Female|Other)$/,
			email: /^[a-z0-9.-_-\-\]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
		};

		if (checkField[name].test(value)) {
			if (name === 'cpf') {
				isValidField = cpfCheck.validate(value);
			} else if (name === 'birthday') {
				let dateValue = moment(value, 'DD/MM/YYYY');
				let currentDate = moment();
				let passLimitDate = moment().subtract(115, 'years');
				isValidField = dateValue.isBetween(passLimitDate, currentDate);
			}
            else {
				isValidField = true;
			}
		}

		return isValidField;
	}
	setField(e) {
		let value = e.target.value;
		let name = e.target.getAttribute('name');

		if (name === 'phone') {
			value = value.replace(/_$/g, '');
		}
        if (name === 'name') {
                value = value.replace(/( )+/g, ' ');
            }

		let inputData = { ...this.state.inputData };

		inputData[name] = value;
		this.setState({
			inputData
		});
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
		text = text.replace(new RegExp('[\']', 'g'), ' ');

		return text;
	}

	getData() {
		let inputData = this.state.inputData;

		let dataSend = {};

		for (var fieldName in inputData) {
			if (this.checkField(fieldName, inputData[fieldName])) {
				let value = inputData[fieldName];
				if (fieldName === 'name') {
					value = this.removeAcento(value);
				}

				dataSend[fieldName] = {
					error: false,
					value
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
		this.props.onData(this.state.inputData.cpf);
    console.log(this.props);

		return (
			<div className='col-xs-12 col-md-offset-3 col-md-9'>
				<div className='form-step form-step-1'>
					{fieldError}
					<div className='form-wiz'>
						<ul>
							<li>
								<span className='f-bold dot'>1</span>{' '}
								<span className='dot-text'>Beneficiário</span>
							</li>
						</ul>
					</div>
					<div className='form-title'>
						<h2>
							Para quem é o <strong className='f-bold'>yalo</strong>?
						</h2>
					</div>
					{/* Formulário de dados pessoais */}
					<div className='row'>
						<div className='col-xs-12 col-md-6'>
							<div className='form-group'>
								<input
									maxLength='80'
									type='text'
									className='form-control'
									required
									id='nome'
									name='name'
									onChange={this.setField}
									value={this.state.inputData.name}
								/>
								<label htmlFor='nome'>Nome completo</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-6'>
							<div className='form-group'>
								<InputMask
									type='text'
									className='form-control'
									required
									id='cpf'
									name='cpf'
									onChange={this.setField}
									mask='999.999.999-99'
									maskChar=''
									value={this.state.inputData.cpf}
								/>
								<label htmlFor='cpf'>CPF</label>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-xs-12 col-md-4'>
							<div className='form-group'>
								<InputMask
									type='text'
									className='form-control'
									id='telefone'
									required
									name='phone'
									onChange={this.setField}
									mask='(99) 9999-99999'
									maskChar=''
									value={this.state.inputData.phone}
								/>
								<label htmlFor='telefone'>Telefone</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-4'>
							<div className='form-group'>
								<InputMask
									type='text'
									className='form-control'
									required
									id='nascimento'
									name='birthday'
									onChange={this.setField}
									mask='99/99/9999'
									maskChar=''
									value={this.state.inputData.birthday}
								/>
								<label htmlFor='nascimento'>Data de Nascimento</label>
							</div>
						</div>
						<div className='col-xs-12 col-md-4'>
							<div className='form-group select-new'>
								<select
									type='text'
									className='form-control no-border'
									required
									id='gender'
									name='gender'
									onChange={this.setField}
									value={this.state.inputData.gender}>
									<option></option>
									<option value='Male'>Masculino</option>
									<option value='Female'>Feminino</option>
								</select>
								<label htmlFor='gender'>Sexo</label>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-xs-12 col-md-6'>
							<div className='form-group'>
								<input
									type='email'
									className='form-control'
									required
									id='email'
									name='email'
									onChange={this.setField}
									value={this.state.inputData.email}
								/>
								<label htmlFor='email'>E-mail</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormBeneficiario;
