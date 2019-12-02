import React from 'react';

import Home2 from '../Containers/Home2';
import UserList from '../Containers/UserList';
import Beneficiario from '../Containers/Beneficiario';
import EnderecoBeneficiario from '../Containers/EnderecoBeneficiario';
import Carrinho from '../Containers/Carrinho';
import Pagamento from '../Containers/Pagamento';
import Sucesso from '../Containers/Sucesso';
import EnderecoEntrega from '../Containers/EnderecoEntrega';
import Erro from '../Containers/Erro';

import Sidebar from '../Components/Sidebar';

import { Route, withRouter } from 'react-router-dom';

import './index.scss';

function App() {
	const RouteSidebar = withRouter(props => <Sidebar {...props} />);
	return (
		<div>
			<Route
				exact
				path={process.env.PUBLIC_URL + '/userList'}
				component={UserList}
			/>
			<Route exact path={process.env.PUBLIC_URL + '/'} component={Home2} />
			<Route
				exact
				path={process.env.PUBLIC_URL + '/beneficiario'}
				component={Beneficiario}
			/>
			<Route
				exact
				path={process.env.PUBLIC_URL + '/enderecoBeneficiario'}
				component={EnderecoBeneficiario}
			/>
			<Route
				exact
				path={process.env.PUBLIC_URL + '/carrinho'}
				component={Carrinho}
			/>
			<Route
				exact
				path={process.env.PUBLIC_URL + '/pagamento'}
				component={Pagamento}
			/>
			<Route
				exact
				path={process.env.PUBLIC_URL + '/enderecoEntrega'}
				component={EnderecoEntrega}
			/>
			<Route
				exact
				path={process.env.PUBLIC_URL + '/sucesso'}
				component={Sucesso}
			/>
            <Route
				exact
				path={process.env.PUBLIC_URL + '/erro'}
				component={Erro}
			/>
			<RouteSidebar></RouteSidebar>
		</div>
	);
}

export default App;
