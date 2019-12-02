import React, { Component } from 'react';

class NextBtn extends Component {
	render() {
		return (
			<div className='col-xs-12 col-md-offset-3 col-md-9 formBtn'>
				<div className='row'>
					<button className='f-bold button-sticky go-step-2' {...this.props}>
						Avançar
					</button>
				</div>
			</div>
		);
	}
}

export default NextBtn;
