import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './pages/Home';
import Register from './pages/Register';
import Painel from './pages/Painel';
import Login from './pages/Login';
import auth from './services/auth.service';
import Contact from './pages/Contact/contact';
import ConsultProcess from './pages/ConsultProcess/ConsultProcess';
import Offer from './pages/Offer/Offer';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NewPassword from './pages/NewPassword/NewPassword';
import Plans from './pages/Plans/Plans';
import AddInfo from './pages/AddInfo/AddInfo';
import MyPerfil from './pages/MyPerfil/MyPerfil';
import MyAccount from './pages/MyAccount/MyAccount';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import MoreInfoProcess from './pages/MoreInfoProcess/MoreInfoProcess';
import Faq from './pages/Faq/Faq';
import RegisterProcess from './pages/RegisterProcess';
import RegisterUser from './pages/RegisterUser';
import AssignMediator from './pages/AssignMediator/AssignMediator';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (auth.isAuthenticated()) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => <Redirect to={{ pathname: '/', state: { from: location } }} />}
    />
  );
};

const RouterLogging = ({ component: Component, ...rest }) => {
  if (!auth.isAuthenticated()) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect to={{ pathname: '/painel', state: { from: location } }} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
};

RouterLogging.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
};

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register/:userId/:token?" component={Register} />
        <PrivateRoute path="/painel" component={Painel} />
        <PrivateRoute path="/cadastro-processo/:id?" component={RegisterProcess} />
        <RouterLogging path="/login/:userId" component={Login} />
        <Route path="/contato" component={Contact} />
        <Route path="/consultar-processo" component={ConsultProcess} />
        <Route path="/como-funciona" component={HowItWorks} />
        <Route path="/ofertar" component={Offer} />
        <RouterLogging path="/forgot-password/:userId" component={ForgotPassword} />
        <RouterLogging path="/new-password/:token" component={NewPassword} />
        <Route path="/planos" component={Plans} />
        <Route path="/faq" component={Faq} />
        <PrivateRoute path="/insert-user" component={RegisterUser} />
        <PrivateRoute path="/adicionar-informacoes/:id/:progressId?" component={AddInfo} />
        <PrivateRoute path="/meu-perfil" component={MyPerfil} />
        <PrivateRoute path="/minha-conta" component={MyAccount} />
        <PrivateRoute path="/mais-informacoes-processo/:number" component={MoreInfoProcess} />
        <PrivateRoute path="/assign-mediator/:id" component={AssignMediator} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
