import React, { Component } from "react";
import {paymentService} from './../../services/payment.service';

export class PlanDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planDetails: props.planDetails,
      users: props.users
    };
    this.changeSubscribe = this.changeSubscribe.bind(this);
  }

  changeSubscribe(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    var id = event.target.id;
    const changedUsers = this.state.users.map(obj =>{
      //different types
        if (obj.id == id){
            return {...obj, subscribed: value}
        }
        return obj
    });

    this.setState({
        users: changedUsers
    });
  }

  doSubscribeUsers(){
    var users = this.state.users;
    var reqBody = {
      "subscribedUsers": users
    }
    paymentService.subscribeUsers(reqBody);
  }

  render() {
    const paymentDef = this.state.planDetails.payment_definitions.map(def => (
      <div key={def.id}>
        <p>Name: {def.name}</p>
        <p>Type: {def.type}</p>
        <p>Interval: {def.frequency_interval}</p>
        <p>Cycles: {def.cycles}</p>
        <p>
          Amount: {def.amount.currency} {def.amount.value}{" "}
        </p>
        <b>Charges:</b>
        {def.charge_models.map(charge_model => (
          <div key={charge_model.id}>
            <p> Type: {charge_model.type}</p>
            <p>
              {" "}
              Amount:{charge_model.amount.currency} {charge_model.amount.value}
            </p>
          </div>
        ))}
      </div>
    ));
    let planDetails = this.state.planDetails;
    let users = this.state.users;
    const details = (
      <div key={planDetails.id}>
        <p>
          <b>Name:</b> {planDetails.name}
        </p>
        <p>
          <b>Description:</b> {planDetails.description}
        </p>
        <p>
          <b>Type:</b> {planDetails.type}
        </p>
        <p>
          <b>State:</b> {planDetails.state}
        </p>
        <p>
          <b>Create Time:</b> {planDetails.create_time}
        </p>
        <p>
          <b>Update time:</b> {planDetails.update_time}
        </p>
        <b>Definitions</b> {paymentDef}
      </div>
    );
    const usersSubscribeList = users.map(user => (
      <li
        key={user.id}
        className="list-group-item d-flex justify-content-between"
      >
        <div className="ml-1">
          {user.firstName} {user.lastName}
        </div>
        <div>
          <input
            type="checkbox"
            name="subscribed"
            className="form-check-input mr-1"
            id={user.id}
            style={{ color: "#2956ab", cursor: "pointer" }}
            value="Subscribed"
            onChange={e => this.changeSubscribe(e)}
            checked={user.subscribed}
          />
        </div>
      </li>
    ));

    return (
      <div className="mt-5">
        <h3>Payment Details</h3>
        {details}
        <h2>Subscribed Users</h2>
        <ul className="list-group">{usersSubscribeList}</ul>
        <button
          className="btn mt-3"
          aria-label="Save"
          style={{ backgroundColor: "#29ab97", color: "#fff" }}
          onClick={e => this.doSubscribeUsers()}
        >
          Save
        </button>
      </div>
    );
  }
}