import React, { Component } from "react";
import { tenantService } from "../../services/tenant.service";
class Tenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houses: [
        {
          id: 4444,
          name: "",
          address: "Nicolae Sulac",
          rooms: 2
        },
        {
          id: 1,
          name: "",
          address: "bl Moscovei",
          rooms: 4
        }
      ],
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      houseId: 0
    };

    this.createTenant = this.createTenant.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelectHouse = this.handleSelectHouse.bind(this);
  }

  createTenant(e) {
    e.preventDefault();
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

  render() {
    const houses = this.state.houses.map(house => (
      <option key={house.id} data-id={house.id} value={this.state.houseId === house.id}>
        {house.address}
      </option>
    ));
    const { onTenantsBack, isEdit, tenantId } = this.props;

    if (isEdit) {
      if (tenantId != null) {
        var tenant = tenantService.getById(tenantId);

        if (tenant != null) {
          this.setState({
            firstName: tenant.firstName,
            lastName: tenant.lastName,
            email: tenant.email,
            houseId: tenant.houseId
          });
        }
      }
    }

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
            {" "}
            {isEdit ? " Edit Tenant" : "New Tenant"}
          </h3>
          <form onSubmit={this.createTenant}>
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
