import React, { Component } from "react";
import {userService} from "../../services/user.service";
import "./user-nav.css";

class UserNav extends Component {
  logout(){
    userService.logout();
  }
  render() {
    return (
      <div
        className="border-bottom"
        style={{ width: "100%"}}
      >
        <ul className="nav flex-row-reverse nav-fill m-lg-3 m-2 align-items-center">
          <li className="list-item mr-md-5 mr-sm-2 btn btn-success  " onClick={this.logout}>Logout</li>
        </ul>
      </div>
    );
  }
}

export default UserNav;
