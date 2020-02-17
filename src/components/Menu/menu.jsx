import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

class Menu extends Component {
  constructor(props){
    super(props);

    this.state = {
      collapsed: true,
      navClassName: "collapse navbar-collapse h-100"
    }

    this.toggleNav = this.toggleNav.bind(this);

  }

  toggleNav(){
    var collapsed = this.state.collapsed;
    var className = "collapse navbar-collapse h-100";
    if (collapsed){
      className = "navbar-collapse h-100"
    }

    this.setState({
      collapsed: !collapsed,
      navClassName: className
    })
  }

  render() {
    return (
        <div className="position-absolute h-100 ml-md-5" style={{zIndex: "999" }}>
          <button
            className="btn d-lg-none ml-1 mt-1 top-0 position-relativ"
            type="button"
            onClick={this.toggleNav}
            aria-label="Toggle navigation"
            style={{position: "relative"}}
          >
            <i className="material-icons">menu</i>
          </button>
            <div className="border-lg-right costum-nav navbar-expand-lg navbar d-flex flex-column align-content-around p-0">
          <div className={this.state.navClassName} style={{position: "absolute"}} >

              <ul className="nav flex-column nav-fill h-100 m-lg-2" >
                <li className="nav-item d-flex align-items-center justify-content-center" >
                  <Link to="/">
                    <i className="material-icons navColor" >dashboard</i>
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center justify-content-center">
                  <Link to="/houses">
                    <i className="material-icons navColor">business</i>
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center justify-content-center">
                  <Link to="/tenants">
                    <i className="material-icons navColor">supervisor_account</i>
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center justify-content-center">
                  <Link to="/payment">
                    <i className="material-icons navColor">payment</i>
                  </Link> 
                </li>
                <li className="nav-item d-flex align-items-center justify-content-center">
                  <a className="nav-link disabled" href="#">
                    <i className="material-icons navColor">message</i>
                  </a>
                </li>
              </ul>
          </div>

            </div>


        </div>
      );
  }
}

export default Menu;
