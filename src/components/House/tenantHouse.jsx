import React, { Component } from "react";
import { houseService } from "../../services/house.service";
class TenantHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: {}
    };
  }

  componentDidMount() {
    houseService.getHouseForTenant().then(house => {
      this.setState({
        house
      });
    });
  }
  render() {
    const {house} = this.state;
    const items =  (
      <div className="card w-75 mt-5" style=
        {{
          backgroundColor: "#fff",
          color: "",
          padding: "20px 20px 0px",
          marginBottom: "10px"
        }}
        key={house.id}>
        <div className="card-body container ">
        <h4>{house.name}</h4>
        <div>Description: {house.description} </div>
        <div>Number of rooms: {house.numberOfRooms}</div>
        <div>Address: {house.address}</div>
        </div>
      </div>
    );
    console.log(house);
    return <div className="col-md-8 m-auto" style={{backgroundColor: ""}}> {items}</div>;
  }
}

export default TenantHouse;
