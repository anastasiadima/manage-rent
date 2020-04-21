import React, { Component } from "react";
import {houseService} from "../../services/house.service";
class Tenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houses: [],
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      houseId: 0
    };

    this.createTenant = this.props.onCreateTenant;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelectHouse = this.handleSelectHouse.bind(this);
  }

  getHouses(){
    return houseService.getAll();
  }

  handleOnChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSelectHouse(e) {
    let idx = e.target.selectedIndex;
    let id = e.target.options[idx].dataset.id;

    this.setState({
      houseId: id
    });
  }

  getTenant(){
    if (this.state.houseId === 0){
        this.setState({
          houseId: this.state.houses[0].id
        });
    }
    return {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      houseId: this.state.houseId,
      email: this.state.email
    }
  }

  componentDidMount(){
    this.getHouses().then(reponse => this.setState(
      {
        houses: reponse
      }
    ));
  }
  render() {
    const houses = this.state.houses.map(house => (
      <option key={house.id} data-id={house.id} value={this.state.houseId === house.id}>
        {house.address}
      </option>
    ));

    const { onTenantsBack } = this.props;
    return (
      <div className="col-md-8 m-auto">
        <button
          className="btn mt-5 "
          style={{
            backgroundColor: "#fff",
            color: "#29ab97",
            cursor: "pointer"
          }}
          onClick={() => onTenantsBack()}
        >
          {"<< "}Back to List
        </button>

        <div>
          <h3 className="mt-3 mb-3">
            New Tenant
          </h3>
          <form onSubmit={(e) => this.createTenant(e, this.getTenant())}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                onChange={event => this.handleOnChange(event)}
                value={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                onChange={event => this.handleOnChange(event)}
                value={this.state.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder=""
                onChange={event => this.handleOnChange(event)}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="houseSelect">Select house</label>
              <select
                className="form-control"
                id="house"
                onChange={e => this.handleSelectHouse(e)}
              >
                {houses}
              </select>
            </div>
            {/* <h3>Payment Information</h3>
            <div className="form-group">
              <label htmlFor="lastName">Rent Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                placeholder=""
                onChange={event => this.handleOnChange(event)}
                value={this.state.email}
              /> */}
            {/* </div> */}
            {/* <div className="form-group">
              <label htmlFor="lastName">Payment Type</label>
              <select>
                <option>Per day</option>
                <option>Per month</option>
                <option>Per year</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Payment Day</label>
              <input
                type="text"
                className="form-control"
                id="payment_day"
                placeholder=""
                onChange={event => this.handleOnChange(event)}
                value={this.state.email}
              /> */}
            {/* </div> */}
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#29ab97",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Tenant;
