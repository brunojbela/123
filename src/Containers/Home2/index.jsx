import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import Loading from '../../Components/Loading';

import { setWaitCampaign } from '../../_redux/actions/campaign';

import { ReactComponent as LogoYalo } from '../../img/logo-yalo.svg';
import img1 from '../../img/img-1.jpg';
import est from '../../img/icon-est.png';
import pranc from '../../img/icon-pranc.png';
import pil from '../../img/icon-pil.png';
import farmacias from '../../img/logo-farmacias.png';
import { ReactComponent as LogoDrConsulta } from '../../img/drconsulta.svg';
import { ReactComponent as AppStore } from '../../img/app-store.svg';
import { ReactComponent as PlayStore } from '../../img/google-play.svg';
import { ReactComponent as Cinema } from '../../img/cinema.svg';
import { ReactComponent as Eletrodomesticos } from '../../img/eletrodomesticos.svg';
import { ReactComponent as Cursos } from '../../img/cursos.svg';
import { ReactComponent as IconC1 } from '../../img/icon-c-1.svg';
import { ReactComponent as IconC2 } from '../../img/icon-c-2.svg';
import { ReactComponent as IconC3 } from '../../img/icon-c-3.svg';

import { campaignUtils } from '../../utils';

class Home2 extends Component {
	componentWillMount() {
		if (campaignUtils.checkExist(this.props.location.search)) {
			let campaignData = campaignUtils.getData();
			this.props.setWaitCampaign(campaignData);
		}
	}
	componentDidMount() {
		if (window.jQuery) {
			let $ = window.jQuery;

			$('.drc-carousel').slick({
				centerPadding: '30px',
				infinite: false,
				arrows: false,
				dots: true
			});
			$('.discounts-carousel').slick({
				centerPadding: '30px',
				infinite: false,
				arrows: false,
				dots: true,
				mobileFirst: true,
				responsive: [
					{
						breakpoint: 992,
						settings: 'unslick'
					}
				]
			});
		}
	}
	render() {
		return (
			<div className='page-wrapper'>
				<Loading></Loading>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xs-12 col-md-9 landing'>
							<section className='section featured'>
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-xs-12'>
											<a
												href='https://yalo.com.br'
												className='hidden-md hidden-lg'>
												<LogoYalo className='img-responsive'></LogoYalo>
											</a>
										</div>
									</div>
									<div className='row'>
										<div className='col-xs-8 col-md-7'>
											<h1 className='f-bold'>
												Mais qualidade de vida <strong>pagando menos.</strong>
											</h1>
										</div>
									</div>
								</div>
							</section>
							<section className='section drc'>
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-xs-12 col-md-4 hidden-md hidden-lg'>
											<img
												src={img1}
												className='img-responsive img-circle'
												alt=''
											/>
										</div>
										<div className='col-md-12 visible-md visible-lg'>
											<div className='row'>
												<div className='col-xs-12 col-md-4'>
													<div className='drc-box'>
														<div className='drc-box--icon'>
															<img
																src={est}
																className='img-responsive img-circle'
																alt=''
															/>
														</div>
														<div className='drc-box--content'>
															<h2>
																Consulta por apenas{' '}
																<strong className='f-bold'>R$ 40,00</strong> no
																dr.consulta
															</h2>
															<p id='mais-saude'>
																Diversas especialidades médicas no dr.consulta.
															</p>
														</div>
													</div>
												</div>
												<div className='col-xs-12 col-md-4'>
													<div className='drc-box'>
														<div className='drc-box--icon'>
															<img
																src={pranc}
																className='img-responsive img-circle'
																alt=''
															/>
														</div>
														<div className='drc-box--content'>
															<h2>
																<strong className='f-bold'>
																	20% de desconto
																</strong>{' '}
																em exames no dr.consulta
															</h2>
															<p>
																Desconto em toda a rede dr.consulta e descontos
																especiais em outros parceiros.
															</p>
														</div>
													</div>
												</div>
												<div className='col-xs-12 col-md-4'>
													<div className='drc-box'>
														<div className='drc-box--icon'>
															<img
																src={pil}
																className='img-responsive img-circle'
																alt=''
															/>
														</div>
														<div className='drc-box--content'>
															<h2>
																Até{' '}
																<strong className='f-bold'>
																	70% de desconto
																</strong>{' '}
																em remédios
															</h2>
															<p>
																São mais de 5 mil medicamentos em mais de 11 mil
																farmácias ao redor do Brasil.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='row visible-xs visible-sm'>
										<div className='col-xs-12'>
											<h2 className='f-thin'>
												Com o cartão <span className='f-regular'>yalo</span> no{' '}
												<LogoDrConsulta alt='dr.consulta'></LogoDrConsulta>
											</h2>
											<div className='drc-carousel'>
												<div className='drc-item'>
													<h3 className='drc-item--text f-bold'>
														<span className='drc-item--text-up t-gray'>R$</span>
														40<span className='drc-item--text-up'>,00</span>
													</h3>
													<p>
														por <strong className='f-bold'>consulta</strong>
													</p>
												</div>
												<div className='drc-item'>
													<h3 className='drc-item--text f-bold'>
														20<span className='drc-item--text-down'>%</span>
													</h3>
													<p>
														de <strong className='f-bold'>desconto</strong> em{' '}
														<strong className='f-bold'>exames</strong>
													</p>
												</div>
												<div className='drc-item'>
													<p className='small'>A partir de</p>
													<h3 className='drc-item--text f-bold'>
														<span className='drc-item--text-up t-gray'>R$</span>
														33<span className='drc-item--text-up'>,90</span>
													</h3>
													<p className='small'>/mês</p>
												</div>
											</div>
										</div>
									</div>
									<div className='row visible-md visible-lg stripe-drc sec-high'>
										<div className='col-md-5'>
											<img
												src={img1}
												className='img-responsive img-circle'
												alt=''
											/>
											<div className='price-circle price-circle-md'>
												<div className='price-holder'>
													<p>
														A partir de <br />
														<span className='middle'>R$</span>{' '}
														<span className='price f-bold'>33</span>
														<span className='up f-bold'>,90</span>{' '}
														<span className='down'>/mês</span>
													</p>
												</div>
											</div>
										</div>
										<div className='col-md-7'>
											<h2 className='f-thin'>
												Com o cartão <span className='f-regular'>yalo</span> no{' '}
												<LogoDrConsulta alt='dr.consulta'></LogoDrConsulta>
											</h2>
											<div className='row'>
												<div className='col-md-6'>
													<div className='drc-item'>
														<h3 className='drc-item--text f-bold'>
															<span className='drc-item--text-up t-gray'>
																R$
															</span>
															40<span className='drc-item--text-up'>,00</span>
														</h3>
														<p>
															por <strong className='f-bold'>consulta</strong>
														</p>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='drc-item'>
														<h3 className='drc-item--text f-bold'>
															20<span className='drc-item--text-up'>%</span>
														</h3>
														<p>
															de <strong className='f-bold'>desconto</strong> em{' '}
															<strong className='f-bold'>exames</strong>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='row visible-md visible-lg'>
										<div className='col-md-6 col-md-offset-4'>
											<p className='sem-carencia-desk'>
												Yalo é sem carência. Não é plano de saúde.
											</p>
										</div>
									</div>
									<div className='row hidden-md hidden-lg'>
										<div className='col-xs-12'>
											<div className='drc-stripe'>
												<p>
													Não é plano de saúde.{' '}
													<strong className='f-bold'>
														Yalo é sem carência!
													</strong>
												</p>
											</div>
										</div>
									</div>
									<div className='row visible-md visible-lg'>
										<div className='col-md-12'>
											<div className='box-discounts'>
												<h3 className='f-bold'>
													Ganhe até 70% de desconto em medicamentos.
												</h3>
												<div className='row'>
													<div className='col-md-6'>
														<p className='f-bold' id='mais-facilidade'>
															Mais de 5 mil medicamentos em mais de 11 mil
															farmácias
														</p>
													</div>
													<div className='col-md-6'>
														<img
															src={farmacias}
															className='img-responsive'
															alt=''
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
							<section className='section meds hidden-md hidden-lg'>
								<div className='container-fluid'>
									<div className='meds-box'>
										<h2>%</h2>
										<p className='meds-box--intro f-bold'>
											Ganhe até{' '}
											<strong className='f-xbold'>70% de desconto</strong> em
											medicamentos
										</p>
										<img src={farmacias} className='img-responsive' alt='' />
										<p>
											São mais de{' '}
											<strong className='f-regular'>5 mil medicamentos</strong>{' '}
											em mais de{' '}
											<strong className='f-regular'>
												11 mil farmácias pelo Brasil
											</strong>
											.
										</p>
									</div>
								</div>
							</section>
							<section className='section hands sec-high'>
								<div className='container-fluid'>
									<div className='row hidden-md hidden-lg'>
										<div className='col-xs-12'>
											<div className='hands-box'>
												<h3 className='f-bold'>
													Mais descontos na palma da sua mão
												</h3>
											</div>
										</div>
									</div>
									<div className='row visible-md visible-lg'>
										<div className='col-md-offset-5 col-md-7'>
											<h2 className='f-bold'>
												Mais descontos na palma da sua mão
											</h2>
											<div className='hands-offset'>
												<p>
													Acesse o app e descubra onde você pode aproveitar os
													benefícios de ser{' '}
													<strong className='f-bold'>yalo</strong>, além de
													ficar por dentro de todas as novidades.
												</p>
												<br />
												<div className='row'>
													<div className='col-md-3'>
														<a
															href='https://itunes.apple.com/BR/app/id1390736078?mt=8'
															target='_blank'
															rel='noopener noreferrer'>
															<AppStore></AppStore>
														</a>
													</div>
													<div className='col-md-3'>
														<a
															href='https://play.google.com/store/apps/details?id=br.com.yalo.yalo'
															target='_blank'
															rel='noopener noreferrer'>
															<PlayStore></PlayStore>
														</a>
														<p id='mais-beneficios'>&nbsp;</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
							<section className='section hands-phrase hidden-md hidden-lg'>
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-xs-12'>
											<p>
												<strong className='f-bold'>
													Acesse o app e descubra
												</strong>{' '}
												onde você pode aproveitar os benefícios de ser{' '}
												<strong className='f-bold'>yalo</strong>.
											</p>
										</div>
									</div>
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
							</section>
							<section className='section discounts sec-high'>
								<div className='container-fluid'>
									<div className='discounts-holder'>
										<h3 className='f-bold'>Clube de Descontos</h3>
										<div className='discounts-carousel'>
											<div className='discounts-item'>
												<div className='discounts-item--inner'>
													<Cinema></Cinema>
													<h3>
														<strong className='f-bold'>Cinemas</strong> até{' '}
														<strong className='f-bold'>50%</strong>
													</h3>
												</div>
											</div>
											<div className='discounts-item'>
												<div className='discounts-item--inner'>
													<Eletrodomesticos></Eletrodomesticos>
													<h3>
														<strong className='f-bold'>Eletrodomésticos</strong>{' '}
														até <strong className='f-bold'>50%</strong>
													</h3>
												</div>
											</div>
											<div className='discounts-item'>
												<div className='discounts-item--inner'>
													<Cursos></Cursos>
													<h3 id='mais-economia'>
														<strong className='f-bold'>Cursos</strong> até{' '}
														<strong className='f-bold'>30%</strong>
													</h3>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
							<section className='section insurance'>
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-xs-12'>
											<div className='insurance-title--align'>
												<h2 className='insurance-title'>
													Além de sorteios no valor de 5 mil reais (bruto de imposto de renda) e cobertura para morte, invalidez permanente por acidente e assistência funeral.*
												</h2>
											</div>
										</div>
									</div>
								</div>
							</section>
							<section className='section price-section sec-high'>
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-xs-12 col-md-6'>
											<h3 className='f-bold'>
												<small className='f-regular'>
													Uma opção inteligente para
												</small>{' '}
												quem quer mais qualidade de vida pagando menos.
											</h3>
											<Link
												to='beneficiario'
												className='bordered-box visible-md visible-lg'>
												Assine agora e aproveite os benefícios.
											</Link>
											<div>&nbsp;</div>
											<IconC1
												className='img-circle icon-price-section'
												alt=''></IconC1>
											<IconC2
												className='img-circle icon-price-section'
												alt=''></IconC2>
											<IconC3
												className='img-circle icon-price-section'
												alt=''></IconC3>
											<p className='price-section--message visible-md visible-lg'>
												<strong className='f-bold'>Yalo</strong> não é plano de
												saúde.
												<br />
												<strong className='f-bold'>Yalo</strong> Individual é um
												cartão de desconto pré-pago.
                                                <br />
                                                <br />
                                                <small>* Parcelas feitas em cartão de crédito</small><br/>
                                                <small>** A assinatura mensal é cobrada de maneira recorrente quando o pagamento for feita via cartão de crédito. Para realizar o cancelamento, basta ligar para 0800 591 0697</small>
											</p>
										</div>
										<div className='col-xs-12 col-md-6'>
											<div className='row'>
												<div className='col-xs-12 col-md-12 col-lg-4'>
													<div className='price-circle circle-1'>
														<div className='price-holder'>
															<p>
																Em até 12x de <br />
																<span className='middle'>R$</span>{' '}
																<span className='price f-bold'>33</span>
																<span className='up f-bold'>,90</span>{' '}
																<span className='bottom'>Assinatura Anual *</span>
															</p>
														</div>
													</div>
												</div>
												<div className='col-xs-12 col-md-6 col-lg-4'>
													<div className='price-circle circle-2'>
														<div className='price-holder'>
															<p>
																Em até 6x de <br />
																<span className='middle'>R$</span>{' '}
																<span className='price f-bold'>35</span>
																<span className='up f-bold'>,90</span>{' '}
																<span className='bottom'>
																	Assinatura Semestral *
																</span>
															</p>
														</div>
													</div>
												</div>
												<div className='col-xs-12 col-md-6 col-lg-4'>
													<div className='price-circle circle-3'>
														<div className='price-holder'>
															<p className='no-top'>
																&nbsp; <br />
																<span className='middle'>R$</span>{' '}
																<span className='price f-bold'>38</span>
																<span className='up f-bold'>,90</span>{' '}
																<span className='bottom'>
																	Assinatura Mensal **
																</span>
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='visible-md visible-lg last-message'>
									<div className='row'>
										<div className='col-xs-12'>
											<p>
												<strong className='f-bold'>
													Qualidade de vida é não perder tempo.
												</strong>{' '}
												Faça seu cadastro, é rapidinho!
											</p>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
				<Link
					to='beneficiario'
					className='f-bold button-sticky hidden-md hidden-lg mobile-sign'>
					Assinar agora!
				</Link>
			</div>
		);
	}
}

const mapStateToProps = actionObject => {
	return actionObject;
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setWaitCampaign }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home2);
