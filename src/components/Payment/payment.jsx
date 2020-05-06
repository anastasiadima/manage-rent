import React, { Component } from 'react';
import PlanPage from './planpage';
import TenantPlansList from "./tenantPlansList";
import {paymentService} from '../../services/payment.service';

class PaymentModule  extends Component {
  constructor(props){
      super(props);
  }

  handleCreatePlan = (e, plan)=>{
    e.preventDefault();
    paymentService.createPlan(plan);
  }
  
  render() { 
    const {currentUser} = this.props;
    return (
      <div className="col-10 col-md-8 vh-100 m-auto ">
        { currentUser && currentUser.role === "Tenant" ? (
          <TenantPlansList/>
        ) : (
          <PlanPage isAddPlan={this.props.isAddPlan}/>
        )}
       </div>);
  }
} 
export default PaymentModule;