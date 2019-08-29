import React, { Component } from "react";

class InfoCard extends Component {
  state = {};
  render() {
    return (
      <div className="card bg-info text-light" style={{ width: "18rem", backgroundColor: "" }}>
        <div className="card-body text-center ">
           <h3>{this.props.text}</h3> 
        </div>
        <div className="card-footer text-center">
            <button href="#" class="btn bg-light">
              Details
            </button>
          </div>
      </div>
    );
  }
}

export default InfoCard;
