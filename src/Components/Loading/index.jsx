import React, { Component } from 'react';

class NextBtn extends Component {
	render() {
		let loadContent = '';
		if (this.props.show) {
			loadContent = <div className='loading'></div>;
		}
        else if (this.props.show1) {
			loadContent = <div className='loading'><p>Esse processo pode levar até 60 segundos</p></div>;
		}
		return <div>{loadContent}</div>;
	}
}

export default NextBtn;
