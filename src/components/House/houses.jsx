import React, { Component } from "react";
import House from "./house";
import { HouseList } from "./houseList";
import { houseService } from "../../services/house.service";
import EditHouse from "./editHouse";

class Houses extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      isCreateHouse: false,
      isEditHouse: false,
      houses: props.houses,
      editHouse: {},
      createdSuccess: false
    };

    this.handleAddHouse = this.handleAddHouse.bind(this);
    this.handleEditHouse = this.handleEditHouse.bind(this);
    this.handleListOfHouses = this.handleListOfHouses.bind(this);
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
      houseService.getAll().then(response =>
        this.setState({
          houses: response,
          createdSuccess: true
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
    const newHouses = this.state.houses.filter(i =>
      i.id != id
      );
      this.setState({
        houses: newHouses
      });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      houses: nextProps.houses,
      createdSuccess: nextProps.createdSuccess
    });
  }

  render() {
    return (
      <div className="col-10 col-md-8 vh-100 m-auto">
        {this.state.isCreateHouse ? (
          <House
            onHouseList={this.handleListOfHouses}
            onCreateHouse={this.handleCreateHouse}
            createdSuccess={this.state.createdSuccess}
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
