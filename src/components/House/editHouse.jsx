import React, { Component } from "react";
class EditHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.house.name,
      address: this.props.house.address,
      description: this.props.house.description,
      id: this.props.house.id,
      ownerId: 1,
      numberOfRooms: this.props.house.numberOfRooms,
      formErrors: { name: "", address: "" },
      nameValid: false,
      addressValid: false,
      formValid: false
    };
    this.onEditHouse = this.props.onEditHouse;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onHouseBack = this.props.onHouseList;
  }

  handleOnChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

    this.validateField(event.target.id, event.target.value);
    this.validForm();
  }

  getHouse() {
    return {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      id: this.state.id,
      ownerId: this.state.ownerId
    };
  }
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let addressValid = this.state.addressValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 0;
        fieldValidationErrors.name = nameValid ? "" : " is empty";
        break;
      case "address":
        addressValid = value.length >= 6;
        fieldValidationErrors.address = addressValid ? "" : "is too short";
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      addressValid: addressValid
    });
  };

  validForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.addressValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  render() {
    return (
      <div className="col-md-8 m-auto">
        <button
          className="btn mt-5 "
          style={{
            backgroundColor: "#fff",
            color: "#29ab97",
            cursor: "pointer"
          }}
          onClick={e => this.onHouseBack(e)}
        >
          {"<< "}Back to List
        </button>
        <h3 className="mb-3 mt-5  "> Edit House</h3>
        <form>
          <div
            className={`form-group
                 ${this.errorClass(this.state.formErrors.name)}`}
          >
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
          <div
            className={`form-group
                 ${this.errorClass(this.state.formErrors.address)}`}
          >
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.address}
            />
          </div>
          <div
            className="form-group"
          >
            <label htmlFor="name">Number of Rooms</label>
            <input
              type="number"
              className="form-control"
              id="numberOfRooms"
              placeholder=""
              onChange={event => this.handleOnChange(event)}
              value={this.state.numberOfRooms}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={event => this.handleOnChange(event)}
              className="form-control"
              id="description"
              value={this.state.description}
            ></textarea>
          </div>
          <button
            className="btn mt-3"
            aria-label="Add house"
            style={{ backgroundColor: "#29ab97", color: "#fff" }}
            onClick={e => this.onEditHouse(e, this.getHouse())}
            //disabled={!this.state.formValid}
          >
            Save changes
          </button>
        </form>
      </div>
    );
  }
}

export default EditHouse;
