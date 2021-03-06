import React, { Component } from "react";
import PlanList from "./planlist";
import Plan from "./plan";
import {fetchPlans} from "../../actions/actions";
import { connect } from "react-redux";

import { paymentService } from "../../services/payment.service";
class PlanPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAddPlan: props.isAddPlan,
      plans: props.plans
    };
  }

  componentWillReceiveProps({plans}){
    this.setState({
      plans
    })
  }

  handleCreatePlan = (e, plan) => {
    e.preventDefault(); 
    paymentService.createPlan(plan);
  }

  handleOnAddPlan = (e) => {
    e.preventDefault();
    this.setState({
      isAddPlan: false
    });
  }

  handleBackToList = () => {
    this.setState({
      isAddPlan: true
    });
  }

  handleGetPlanDetails = (e, id) =>{
    return paymentService.getPlanDetails(id);
  }

  handleGetSubscribeUsers = (id) => {
    return paymentService.getSubscribedUsers(id);
  }

  render() {
    return (
      <div className="col-10 col-md-8 vh-100 m-auto"> 
        {this.state.isAddPlan ? (
          <PlanList
            plans={this.props.plans}
            onAddPlan={this.handleOnAddPlan}
            onGetPlanDetails={this.handleGetPlanDetails}
            onGetSubscribeUsers={this.handleGetSubscribeUsers}
          ></PlanList>
        ) : (
          <Plan onBackToList={this.handleBackToList} onCreatePlan={this.handleCreatePlan}/>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  plans:  state.planReducer.plans,
  loading: state.planReducer.isLoading,
  error: state.planReducer.error
});

export default connect(mapStateToProps)(PlanPage);
