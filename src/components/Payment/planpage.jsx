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
      plans: [],
      isAddPlan: true
    };
    this.handleOnAddPlan = this.handleOnAddPlan.bind(this);
    this.getListOfPlans = this.getListOfPlans.bind(this);
    this.handleCreatePlan = this.handleCreatePlan.bind(this);
    this.handleBackToList = this.handleBackToList.bind(this);
    this.handleCreatePlan = this.handleCreatePlan.bind(this);
    this.handleGetPlanDetails = this.handleGetPlanDetails.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPlans());
  }

  getListOfPlans() {
    var plans = paymentService.getAll(); 
    return plans;
  }

  handleCreatePlan(e, plan) {
    e.preventDefault(); 
    paymentService.createPlan(plan).then(response => {
         
    });
  }

  handleOnAddPlan(e) {
    e.preventDefault();
    this.setState({
      isAddPlan: false
    });
  }

  handleBackToList() {
    this.setState({
      isAddPlan: true
    });
  }

  handleGetPlanDetails(e, id) {
    return paymentService.getPlanDetails(id);
  }

  handleGetSubscribeUsers(id) {
    return paymentService.getSubscribedUsers(id);
  }

  componentDidMount() {
    this.getListOfPlans().then(response => {
      this.setState({
        plans: response
      });
    });
  }

  render() {
    return (
      <div className="col-10 col-md-8 vh-100 m-auto"> 
        {this.state.isAddPlan ? (
          <PlanList
            plans={this.state.plans}
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
  plans: state.plans,
  loading: state.isLoading,
  error: state.error
});

export default connect(mapStateToProps)(PlanPage);
