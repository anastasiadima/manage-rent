import React, { Component } from 'react';
import PlanList from './planlist';
import Plan from './plan';

import {paymentService} from '../../services/payment.service';
class PlanPage extends Component {
    constructor(props){
        super(props);
        this.state = { 
        plans: [],
        isAddPlan: true,
        };
        this.handleOnAddPlan = this.handleOnAddPlan.bind(this);
        this.getListOfPlans = this.getListOfPlans.bind(this);
        this.handleCreatePlan = this.handleCreatePlan.bind(this);
        this.handleBackToList = this.handleBackToList.bind(this);
        this.handleCreatePlan = this.handleCreatePlan.bind(this);
        this.handleGetPlanDetails = this.handleGetPlanDetails.bind(this);
    }

    getListOfPlans(){
        var plans =  paymentService.getAll();
        console.log(plans);
        return plans;
    }
    
    handleCreatePlan(e, plan){
        e.preventDefault();
        console.log(plan);
        console.log("create plan");
        paymentService.createPlan(plan).then(response =>{
          console.log(response);
        });
    }

    handleOnAddPlan(e){
        this.setState({
            isAddPlan: false
        });
    }

    handleBackToList(){
        this.setState({
            isAddPlan: true
        });
    }

    handleGetPlanDetails(e, id){
        var details = paymentService.getPlanDetails(id);
        var usersSubscribed = [];
        var result = {
            planDetails: details,
            users: usersSubscribed
        };
        return paymentService.getPlanDetails(id);
    }

    componentDidMount() {
        this.getListOfPlans().then(response => {
            this.setState({
            plans: response
          }) ;
        });
    }

    render() { 
        return (  
            <div className="col-10 col-md-8 vh-100 m-auto">
                {this.state.isAddPlan ? ( <PlanList plans={this.state.plans} onAddPlan={this.handleOnAddPlan} onGetPlanDetails={this.handleGetPlanDetails}></PlanList>) 
                : (<Plan onBackToList={this.handleBackToList}/>) }
            </div>
        );
    }
}
 
export default PlanPage;