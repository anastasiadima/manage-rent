import React, { Component } from "react";
import {houseService} from "../../services/house.service";

class EditTenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houses: [],
      id: this.props.tenant.id,
      firstName: this.props.tenant.firstName,
      lastName: this.props.tenant.lastName,
      email: this.props.tenant.email,
      houseId: this.props.tenant.houseId
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
            Edit Tenant 
          </h3>
          <form onSubmit={(e) => this.props.onUpdateTenant(e, this.getTenant())}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                readOnly
                type="text"
                className="form-control"
                id="firstName"
                placeholder="" 
                value={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                readOnly
                type="text"
                className="form-control"
                id="lastName" 
                value={this.state.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Email</label>
              <input
                readOnly
                type="text"
                className="form-control"
                id="email" 
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
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#29ab97",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditTenant;
