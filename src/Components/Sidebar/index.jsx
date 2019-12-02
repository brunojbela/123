import React, { Component } from 'react';

import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { ReactComponent as LogoYalo } from '../../img/logo-yalo.svg';

import './index.scss';

class Login extends Component {
	constructor() {
		super();

		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll() {
		let itemActive = null;
		for (let refName in this.refs) {
			let element = document.getElementById(refName);
			this.refs[refName].classList.remove('active');

			if (element) {
				let topPosition = element.getBoundingClientRect().top;
				if (topPosition < 0) {
					itemActive = this.refs[refName];
				}
			}
		}

		if (itemActive) {
			itemActive.classList.add('active');
		}
	}
	render() {
		const { pathname } = this.props.location;

		let left = false;
		let content = '';
		if (pathname === process.env.PUBLIC_URL + '/') {
			content = (
				<div className='sidebar-items'>
					<p>
						<strong className='f-bold'>Yalo é muito mais</strong>
						<br />
						<span className='sidebar-item sidebar-item-1' ref='mais-saude'>
							Mais saúde
						</span>
						<br />
						<span className='sidebar-item sidebar-item-2' ref='mais-facilidade'>
							Mais facilidade
						</span>
						<br />
						<span className='sidebar-item sidebar-item-3' ref='mais-beneficios'>
							Mais benefícios
						</span>
						<br />
						<span className='sidebar-item sidebar-item-4' ref='mais-economia'>
							Mais economia
						</span>
					</p>
					<Link
						to='beneficiario'
						className='f-bold button-sticky sidebar-button'>
						Assinar agora!
					</Link>
				</div>
			);
		} else if (pathname === process.env.PUBLIC_URL + '/sucesso'){
		    content = '';
		} else {
			left = true;
			content = (
				<div className='visible-md visible-lg menu-fixed'>
					<Link
						to='beneficiario'
						className={classNames({
							'f-bold': pathname === process.env.PUBLIC_URL + '/beneficiario'
						})}
						style={{ pointerEvents: 'none' }}>
						1. Beneficiário
					</Link>
                    <Link
						to='enderecoBeneficiario'
						className={classNames({
							'f-bold':
								pathname === process.env.PUBLIC_URL + '/enderecoBeneficiario'
						})}
						style={{ pointerEvents: 'none' }}>
						2. Endereço
					</Link>
					<Link
						to='carrinho'
						className={classNames({
							'f-bold': pathname === process.env.PUBLIC_URL + '/carrinho'
						})}
						style={{ pointerEvents: 'none' }}>
						3. Checagem
					</Link>
					<Link
						to='pagamento'
						className={classNames({
							'f-bold': pathname === process.env.PUBLIC_URL + '/pagamento'
						})}
						style={{ pointerEvents: 'none' }}>
						4. Pagamento
					</Link>
				</div>
			);
		}

		let sidebarClass = classNames('fixed-sidebar', { left: left });

		return (
			<div className='col-xs-12 col-md-3'>
				<aside className={sidebarClass}>
					<div className='fixed-sidebar--content'>
						<a href='https://yalo.com.br'>
							<LogoYalo className='img-responsive' alt='Yalo'></LogoYalo>
						</a>
						{content}
					</div>
				</aside>
			</div>
		);
	}
}

export default Login;
