import React, { Component } from "react";
import  House  from "./house";
import { HouseList } from "./houseList";
import {houseService} from '../../services/house.service';

class Houses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateHouse: false
    };

    this.houses = [
      {
        id: 2,
        address: "bd Moscovei 3, or Chisinau",
        name: "Locuita 1",
        description: "",
        numberOfRooms: 1,
        owner: {
          id: 2,
          firstName: "ana"
        }
      },
      {
        id: 1,
        address: "bd Moscovei 12, or Chisinau",
        name: "Locuita 2",
        description: "",
        numberOfRooms: 1,
        owner: {
          id: 2,
          firstName: "ana"
        }
      }
    ];
    this.handleAddHouse = this.handleAddHouse.bind(this);
    this.handleEditHouse = this.handleEditHouse.bind(this);
    this.handleListOfHouses = this.handleListOfHouses.bind(this);
  }

  handleAddHouse = () => {
    this.setState({
      isCreateHouse: true 
    });

    console.log('add house');
  };

  handleEditHouse = e => {};

  handleListOfHouses = () => {};

  handleCreateHouse(e, house){
      e.preventDefault();
      console.log(house);

      houseService.create(house);
  }

  render() {
    return (
      <div className="col-10 col-md-8 vh-100 m-auto">
        {this.state.isCreateHouse ? (
          <House onHouseList={this.handleListOfHouses}  onCreateHouse={this.handleCreateHouse}></House>
        ) : (
          <HouseList
            houses={this.houses}
            onAddHouse={this.handleAddHouse}
            onEditHouse={this.handleEditHouse}
          />
        )}
      </div>
    );
  }
}

export default Houses;
