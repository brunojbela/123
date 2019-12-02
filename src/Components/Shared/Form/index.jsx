import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class Input extends Component {
	render() {
		return (
			<input
				className='input'
				type='text'
				value={this.props.value}
				onChange={this.props.onChange}
			/>
		);
	}
}

class InputPass extends Input {
	constructor() {
		super();
		this.state = { type: 'password' };

		this.toogleVisible = this.toogleVisible.bind(this);
	}
	toogleVisible() {
		let newType = this.state.type === 'password' ? 'text' : 'password';
		this.setState({ type: newType });
	}
	render() {
		return (
			<div className='inputPass'>
				<input
					className='input'
					type={this.state.type}
					value={this.props.value}
					onChange={this.props.onChange}
				/>
				<button className='btn' onClick={this.toogleVisible}>
					Ver
				</button>
			</div>
		);
	}
}

Input.defaultProps = {
	value: '',
	onChange: () => {}
};

Input.propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func
};

export { Input, InputPass };
