import React, { Component } from "react";
import "./user-nav.css";

class UserNav extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div
        className="border-bottom"
        style={{ width: "100%"}}
      >
        <ul className="nav flex-row-reverse nav-fill m-lg-3 m-2 align-items-center">
          <li className="list-item mr-md-5 mr-sm-2">Logout</li>
          <li className="list-item align-items-center">
            <i className="material-icons mr-lg-5 mr-2" style={{ fontSize: "24px"}}>
              person
            </i>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserNav;
