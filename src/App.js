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
import TenantHouse from './components/House/tenantHouse';
import PaymentModule from './components/Payment/payment';
import Chat from './components/Chat/chat';
import {fetchCurrentUser} from "./actions/userAction";
import {fetchHouses} from "./actions/house.actions";
import {connect} from "react-redux";
import Invitations from "./components/Invitation/invitations"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      houses: props.houses,
      plans: props.plans,
      isOwner: false,
      hasError: false
    };
  }
  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.fetchHouses();
  }

  componentWillReceiveProps({currentUser, houses, plans}){
      this.setState({
        currentUser,
        houses,
        plans
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
    return {
      hasError: true
    }
  }

  render() {
    const { currentUser } = this.state;
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
            <PrivateRoute exact path="/"  component={Dashboard}/>
            {currentUser && currentUser.role == Role.Owner ? 
              (<PrivateRoute path="/tenants" roles={[Role.Owner]} component={Tenants} />) 
              : (<PrivateRoute path="/tenants" roles={[Role.Tenant]} component={Invitations} />)}
            <Route  path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home"  render={(props)=> <HomePage {...props} numberOfHouses={this.state.houses.lenght}/>} />
            {currentUser && currentUser.role==Role.Owner ? (
              <Route path="/houses" roles={[Role.Owner] }  render={(props)=> <Houses {...props} houses={this.state.houses}/>} />
            ) : (
              <Route path="/houses" roles={[Role.Owner, Role.Tenant] }  render={(props)=> <TenantHouse  currentUser={currentUser}/>} />
            )}
            <Route path="/payment" roles={[Role.Owner, Role.Tenant] }  render={(props)=> <PaymentModule {...props} plans={this.state.plans} isAddPlan={true} currentUser={currentUser} currentUser={currentUser}/>} />
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
    currentUser: state.userReducer.currentUser,
    houses: state.houseReducer.houses,
    plans: state.planReducer.plans
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchHouses: () => dispatch(fetchHouses())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);