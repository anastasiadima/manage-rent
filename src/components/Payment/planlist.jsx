import React, { Component } from 'react';
import { PlanDetails } from './planDetails';

class PlanList extends Component {
    constructor(props){
        super(props);

        this.state = {
            plans: props.plans,
            details: {},
            isPlanDetails: false,
            users: []
        }
        this.onAddPlan = props.onAddPlan;
        this.onPlanDetails = props.onGetPlanDetails;
        this.onPlanDetails = this.onPlanDetails.bind(this);
        this.onAddPlan = this.onAddPlan.bind(this);
        this.changeStateToDetails = this.changeStateToDetails.bind(this);
        this.changeStateToSubscribed = this.changeStateToSubscribed.bind(this);
        this.onGetSubscribeUsers = props.onGetSubscribeUsers;
    }

    changeStateToDetails(result){
        this.setState({details: result, isPlanDetails: true});
    }

    changeStateToSubscribed(res){
        this.setState({users: res});
    }

    render() { 
        var planItem = this.props.plans.map(plan =>(
            <button  onClick={(e)=>{
                this.onPlanDetails(e, plan.id).then(res => this.changeStateToDetails(res));
                this.onGetSubscribeUsers(plan.id).then(res => this.changeStateToSubscribed(res));;
                console.log(this.state);
            }} key={plan.planId} className="btn"><li className="list-group-item">{plan.name}</li></button>
        ));

        return ( 
            <div>
                {
                    this.state.isPlanDetails 
                    ? ( <PlanDetails planDetails={this.state.details} users={this.state.users}></PlanDetails>) 
                    : (
                        <div>
                            <h3>Payment Plans</h3>
                            <ul className="list-group">{planItem}</ul>
                            <button
                                className="btn mt-3"
                                aria-label="Add plan"
                                style={{ backgroundColor: "#29ab97", color: "#fff" }}
                                onClick={(e) => this.onAddPlan(e)}
                            >
                                Add Plan
                            </button>
                        </div>
                    )
                }
            </div>
         );
    }
}
 
export default PlanList;