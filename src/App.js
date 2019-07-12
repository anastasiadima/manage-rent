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
import Menu from "./components/menu";

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
          {currentUser && <Menu/>}
          <Router history={history}>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/dashboard" component={Dashboard} />
        </Router>
        </div>
    </main>
    );
  }
}

export default App;
