import React, { Component } from "react";

class Menu extends Component {
  state = {};
  render() {
    return (
        <ul className="nav flex-column nav-fill">
          <li className="nav-item">
              <a  className="nav-link" href="#">Dashboar</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
    );
  }
}

export default Menu;
