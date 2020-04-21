import React, { Component } from "react";
import House from "./house";
import { HouseList } from "./houseList";
import { houseService } from "../../services/house.service";
import EditHouse from "./editHouse";

class Houses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateHouse: false,
      isEditHouse: false,
      houses: [],
      editHouse: {}
    };

    this.handleAddHouse = this.handleAddHouse.bind(this);
    this.handleEditHouse = this.handleEditHouse.bind(this);
    this.handleListOfHouses = this.handleListOfHouses.bind(this);
    this.getHouseList = this.getHouseList.bind(this);
    this.handleDeleteHouse = this.handleDeleteHouse.bind(this);
    this.handleCreateHouse = this.handleCreateHouse.bind(this);
    this.handleUpdateHouse = this.handleUpdateHouse.bind(this);
  }

  handleAddHouse = () => {
    this.setState({
      isCreateHouse: true
    });
  };

  handleEditHouse(e, house) {
    this.setState({
      isEditHouse: true,
      editHouse: house
    });
  }

  handleListOfHouses(e) {
    e.preventDefault();

    this.setState({
      isCreateHouse: false,
      isEditHouse: false
    });
  }

  handleCreateHouse(e, house) {
    e.preventDefault();
    console.log(house);
    houseService.create(house).then(r => {
      this.getHouseList().then(response =>
        this.setState({
          houses: response
        })
      );
    });
  }
  handleUpdateHouse(e, house){
    e.preventDefault();
    console.log(house);
    houseService.update(house);
  }
  handleDeleteHouse(e, id) {
    console.log(id);
    houseService.delete(id);
  }

  getHouseList() {
    return houseService.getAll();
  }

  componentDidMount() {
    this.getHouseList().then(response =>
      this.setState({
        houses: response
      })
    );
  }

  render() {
    return (
      <div className="col-10 col-md-8 vh-100 m-auto">
        {this.state.isCreateHouse ? (
          <House
            onHouseList={this.handleListOfHouses}
            onCreateHouse={this.handleCreateHouse}
          ></House>
        ) : this.state.isEditHouse ? (
          <EditHouse
            onHouseList={this.handleListOfHouses}
            onEditHouse={this.handleUpdateHouse}
            house={this.state.editHouse}
          > </EditHouse>
        ) : (
          <HouseList
            houses={this.state.houses}
            onAddHouse={this.handleAddHouse}
            onEditHouse={this.handleEditHouse}
            onCancel={this.handleDeleteHouse}
          />
        )}
      </div>
    );
  }
}

export default Houses;
