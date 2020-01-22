import React, { Component } from "react";
const currencies = ["AUD", "BRL", "CAD","CZK", "DKK", "EUR", "HKD", "HUF", "INR", "ILS", "JPY", "MYR", "MXN", "TWD", "NZD","NOK", "PHP", "PLN", "GBP", "RUB", "SGD", "SEK", "CHF", "THB", "USD"];
const frequency = ["MONTH", "DAY", "WEEK", "YEAR"]


class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      type: "",
      paymentName:"",
      paymentType: "",
      paymentCurrency: "AUD",
      paymentFrequency: "MONTH",
      paymentFrequencyInterval: "",
      paymentCycles: "",
      paymentAmount: 0,
      isDisabled: true
    };
    this.onCreatePlan = this.props.onCreatePlan;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onBackToList = this.props.onBackToList;
  }
  
  handleOnChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

    this.checkValidForm();
   // this.validateField(event.target.id, event.target.value);
  }

  checkValidForm(){
    if (this.state.name !== ""  &&
    this.state.description !== ""  &&
    this.state.type !== "" &&  
    this.state.paymentName !== "" && 
    this.state.paymentCurrency !== ""  &&
    this.state.paymentFrequencyInterval !== "" ){
      this.setState({
        isDisabled: false
      });
    }
     else { 
      this.setState({
        isDisabled: true
      });
     }
      
  }

  handleSelectCurrency(e){
    this.setState({
      paymentCurrency: event.target.value
    });
    this.checkValidForm(); 
    
    console.log(this.state);
  }
  
  handleSelectFrequency(e){
    this.setState({
      paymentFrequency: event.target.value
    });
    this.checkValidForm(); 
  }


  getPlan(){
    return {
      name: this.state.name,
      description: this.state.description,
      type: this.state.type,
      paymentName: this.state.paymentName,
      paymentType: this.state.paymentType,
      paymentCurrency: this.state.paymentCurrency,
      paymentFrequency: this.state.paymentFrequency,
      paymentFrequencyInterval: this.state.paymentFrequencyInterval,
      paymentCycles: this.state.paymentCycles,
      paymentAmount: this.state.paymentAmount,
    }
  }

  render() {
    return (
      <div>
        <form>
            <button
          className="btn mt-5 "
          style={{
            backgroundColor: "#fff",
            color: "#29ab97",
            cursor: "pointer"
          }}
          onClick={e => this.onBackToList(e)}
        >
          {"<< "}Back to List
        </button>
        <h3>Plan Details</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.type}
            />
          </div>
          <div><h3>Payment Definition</h3></div>
          <div className="form-group">
            <label htmlFor="paymentName">Name</label>
            <input
              type="text"
              className="form-control"
              id="paymentName"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.paymentName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentType">Type</label>
            <input
              type="text"
              className="form-control"
              id="paymentType"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.paymentType}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentFrequency">Frequency</label>
            <select
                className="form-control"
                id="paymentFrequency"
                onChange={e => this.handleSelectFrequency(e)}
              >
                {frequency.map((freq) => <option key={freq} value={freq}>{freq}</option>)}
              </select>
          </div>
          <div className="form-group">
            <label htmlFor="paymentFrequencyInterval">Frequency Interval</label>
            <input
              type="number"
              className="form-control"
              id="paymentFrequencyInterval"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.paymentFrequencyInterval}
            />
          </div> 
          <div className="form-group">
            <label htmlFor="paymentCycles">Cycles</label>
            <input
              type="number"
              className="form-control"
              id="paymentCycles"
              placeholder="payment cycles"
              onChange={event => this.handleOnChange(event)}
              value={this.state.paymentCycles}
            />
          </div> 
          <div className="form-group">
            <label htmlFor="paymentAmount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="paymentAmount"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.paymentAmount}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentCurrency">Currency</label>
            <select
                className="form-control"
                id="house"
                onChange={e => this.handleSelectCurrency(e)}
              >
                {currencies.map((curr) => <option key={curr} value={curr}>{curr}</option>)}
              </select>
          </div>
          <button
          className="btn m-10"
          aria-label="Add house"
          style={{ backgroundColor: "#29ab97", color: "#fff", marginBottom: "50px"}}
          onClick={e => this.onCreatePlan(e, this.getPlan())}
          disabled={this.state.isDisabled}
          >
            Create Plan
          </button>
        </form>
      </div>
    );
  }
}
export default Plan;