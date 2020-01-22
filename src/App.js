import React, { Component } from "react";
import "./App.css";
import LoginPage from "./components/login";
import HomePage from "./components/home";
import Dashboard from "./components/dashboard";
import { history } from "./helpers/history";
import { authenticationService } from "./services/authentication.service";
import { Router, Route } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import RegisterPage from "./components/register";
import Menu from "./components/Menu/menu";
import UserNav from "./components/User/user-nav";
import Tenants from './components/Tenants/tenants';
import Houses from './components/House/houses';
import PaymentModule from './components/Payment/payment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ currentUser: x })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <main className="container-fluid">
        <div className="row">
          <Router history={history}>
            {currentUser && <UserNav user={currentUser} />}
            {currentUser && <Menu /> }

            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/tenants" component={Tenants} />
            <Route path="/houses" component={Houses} />
            <Route path="/payment" component={PaymentModule} />
          </Router>
        </div>
      </main>
    );
  }
}

export default App;
