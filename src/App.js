import React, { Component, Fragment } from "react";
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
import Chat from './components/Chat/chat';
import {fetchCurrentUser} from "./actions/userAction";
import {connect} from "react-redux";
import Invitations from "./components/invitations"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      isOwner: false,
      hasError: false
    };
  }
  componentDidMount() {
    this.props.fetchCurrentUser();
    console.log(this.state);
  }

  componentWillReceiveProps({currentUser}){
      this.setState({
        currentUser
      });
  }

  setCurrentUser(){
    authenticationService.currentUser.subscribe(x => {
      this.setState({ currentUser: x,  isOwner: x && x.role === Role.Owner })
    }
    );
  }

  logout() {
    authenticationService.logout();
    this.props.fetchCurrentUser();
    history.push("/login");
  }

  static getDerivedStateFromError(error){
    this.setState({
      hasError: true
    }); 
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser);
    return (
      <main className="container-fluid">
        <div className="row">
          {this.state.hasError ? (<div>something went wrong</div>) : (
            <Router history={history}>
            {currentUser && (
              <Fragment>
              <UserNav user={currentUser} />
              <Menu /> 
              
            </Fragment>
            )}

            <PrivateRoute exact path="/" roles={[Role.Owner]} component={Dashboard} />
            {currentUser && currentUser.role == Role.Owner ? 
              (<PrivateRoute path="/tenants" roles={[Role.Owner]} component={Tenants} />) 
              : (<PrivateRoute path="/tenants" roles={[Role.Tenant]} component={Invitations} />)}
            <Route  path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/houses" component={Houses} />
            <Route path="/payment" roles={[Role.Owner, Role.Tenant] }  render={(props)=> <PaymentModule {...props} isAddPlan={true} currentUser={currentUser}/>} />
            <Route path="/chat"  render={(props)=> <Chat {...props} currentUser={currentUser}/>} />
          </Router>
          )}
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);