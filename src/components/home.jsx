import React, { Component } from "react";
import { authenticationService } from "../services/authentication.service";
import { userService } from "../services/user.service";
import Menu from "../components/menu";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null
    };
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({ users }));
  }
  render() {
    return (
      <div>
        ....HomePage
      </div>
    );
  }
}

export default HomePage;
