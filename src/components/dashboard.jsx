import React, { Component } from "react";
import BarChart from "./Chart/bar-chart";

class Dashboard extends Component {
  state = {};

  data = {
    title: "Categories",
    data: [32, 4, 23, 45, 64, 65, 90, 35]
  };

  render() {
    return (
      <div className="col-12 vh-100 mt-3  d-flex justify-content-lg-center align-items-lg-center">
        <div className="row h-100">
          <div className=" col-lg-8  d-flex justify-content-center ">
            <div className="row ">
              <div className=" col-lg-6 mb-3  d-flex align-items-center justify-content-center">
                <div
                  className="card  w-75"
                  style={{ backgroundColor: "#5ab3a2", color: "#fff" }}
                >
                  <div className="card-body text-center">
                    <i className="material-icons"> domain</i>
                    <h3>Houses 3</h3>
                  </div>
                  <div className="card-footer text-center">
                    <button href="#" className="btn bg-light">
                      Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 mb-3  d-flex align-items-center justify-content-center">
                <div
                  className="card  w-75"
                  style={{ backgroundColor: "#fff", color: "#5ab3a2" }}
                >
                  <div className="card-body text-center ">
                  <i className="material-icons">supervisor_account </i>
                    <h3>Tenants 3</h3>
                  </div>
                  <div className="card-footer text-center">
                    <button href="#" className="btn bg-light">
                      Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 mb-3 d-flex align-items-start justify-content-center">
                <div
                  className="card  w-75"
                  style={{ backgroundColor: "#5ab3a2  ", color: "#fff" }}
                >
                  <div className="card-body text-center ">
                    <i className="material-icons">payment</i>
                    <h3>Payments 1</h3>
                  </div>
                  <div className="card-footer text-center" 
                  >
                    <button href="#" className="btn">
                      Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 mb-3 d-flex align-items-start justify-content-center">
                <div
                  className="card w-75"
                  style={{ backgroundColor: "", color: "#29ab97" }}
                >
                  <div className="card-body text-center ">
                    <i className="material-icons">account_balance_wallet</i>
                    <h3>Balance 3,5 mln</h3>
                  </div>
                  <div className="card-footer text-center">
                    <button href="#" className="btn bg-light">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHART SPACE */}
          <div className="col-sm-12 col-lg-4 d-flex align-items-center justify-content-center">
            <div className="" style={{ width: "", backgroundColor: "" }}>
              <BarChart
                data={[
                  {
                    label: "Apples",
                    value: 10
                  },
                  {
                    label: "Oranges",
                    value: 17
                  },
                  {
                    label: "pere",
                    value: 14
                  },
                  {
                    label: "pere",
                    value: 14
                  },
                  {
                    label: "pere",
                    value: 141
                  },
                  {
                    label: "pere",
                    value: 14
                  },
                  {
                    label: "pere",
                    value: 14
                  }
                ]}
                title="title"
                color="#5ab3a2"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
