import React, { Component } from "react";
import "./App.css";
import LoginPage from "./components/login";
import HomePage from "./components/home";
import Dashboard from "./components/dashboard";
import { history } from "./helpers/history";
import {Role} from "./helpers/role";
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
      currentUser: null,
      isOwner: false
    };
  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => {
      this.setState({ currentUser: x,  isOwner: x && x.role === Role.Owner })
    }
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser,isOwner } = this.state;
    console.log(currentUser);
    return (
      <main className="container-fluid">
        <div className="row">
          <Router history={history}>
            {currentUser && <UserNav user={currentUser} />}
            {currentUser && <Menu /> }

            <PrivateRoute exact path="/" roles={[Role.Owner]} component={Dashboard} />
            <PrivateRoute path="/tenants" roles={[Role.Owner]} component={Tenants} />
            <Route  path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home" component={HomePage} />
            {/* <Route path="/tenants" component={Tenants} /> */}
            <Route path="/houses" component={Houses} />
            <Route path="/payment" component={PaymentModule} />
          </Router>
        </div>
      </main>
    );
  }
}

export default App;
