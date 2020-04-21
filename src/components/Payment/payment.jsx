import React, { useState, useRef, useEffect, Component } from 'react';
import PlanPage from './planpage';
import TenantPlansList from "./tenantPlansList";
import {connect } from 'react-redux';
import {paymentService} from '../../services/payment.service';
import {fetchCurrentUser} from '../../actions/userAction';

class PaymentModule  extends Component {
  constructor(props){
      super(props);

      this.state={
        currentUser: props.currentUser
      }
  }

  handleCreatePlan(e, plan){
    e.preventDefault();
    paymentService.createPlan(plan);
  }
 
  componentDidMount(){   
    console.log(this.state);
    //this.props.dispatch(fetchCurrentUser());
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      currentUser: nextProps.currentUser
    });
  }
  render() { 
    const {currentUser} = this.props;
    return (
      <div className="col-10 col-md-8 vh-100 m-auto ">
        { currentUser && currentUser.role === "Tenant" ? (
          <TenantPlansList/>
        ) : (
          <PlanPage/>
        )}
        
       </div>);
  }
}
// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     currentUser: state.userReducer.currentUser
//   }
// }


//export default connect(mapStateToProps)(PaymentModule); 
export default PaymentModule;