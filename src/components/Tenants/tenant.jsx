import React, { Component } from "react";
class Tenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
        houses: [
          {
            id: 0,
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
        ]
      };

    this.createTenant = this.createTenant.bind(this);
  }
  
  createTenant(e) {
    e.preventDefault();

  }

  handleOnChange(event) {
    this.setState({
        [event.target.id]: event.target.value
    });
    }   

  render() {
    const houses = this.state.houses.map(house => (
        <option key={house.id}>{house.address}</option>
    ));
    const { onTenantsBack } = this.props;

    return (
      <div className="col-md-8 m-auto">
        <button
          className="btn mt-5 "
          style={{ backgroundColor: "#fff", color: "#29ab97", cursor: "pointer" }}
          onClick={() => onTenantsBack()}
        >
          {"<< "}Back to List
        </button>

        <div>
          <h3 className="mt-3 mb-3">New Tenant</h3>
          <form onSubmit={this.createTenant}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                onChange={(event) => this.handleOnChange(event)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                onChange={(event) => this.handleOnChange(event)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="houseSelect">Select house</label>
              <select className="form-control" id="house">
                { houses }
              </select>
            </div>
            <button 
                type="submit" 
                className="btn"
                style={{ backgroundColor: "#29ab97", color: "#fff", cursor: "pointer" }}
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