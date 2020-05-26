import React, { Component } from "react";
import BarChart from "./Chart/bar-chart";
import {connect} from "react-redux";

class Dashboard extends Component {
  constructor(props){
    super(props);
      this.state = {
        housesLenght: 0
      };

  }

  data = {
    title: "Categories",
    data: [32, 4, 23, 45, 64, 65, 90, 35]
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      housesLength: nextProps.housesLength,
      plansLength: nextProps.plansLength
    });
  }

  render() {
   const verde = "#5ab3a2";
  const secondary = "#00bcd4";
  const secondary1 = "#62efff";
  const pDark="#248373";
  const secondary2 = "#008ba3";
  //  const roz = "#b50058";
  //  const albastru = "#0058b5";
  //  const roz2 = "#f10d62";
  //  const violet = "#5e00b5";
  //  const verdeDeschis= "#6bcc8e";

   const chartValues = [ {
     values: [
      {
        label: "December",
        value: 100
      },
      {
        label: "January",
        value: 180
      },
      {
        label: "February",
        value: 140
      },
      {
        label: "March",
        value: 141
      },
      {
        label: "April",
        value: 130
      },
      {
        label: "May",
        value: 10
      }
    ],
    color: secondary,
    title: "House1 $/month"
   },  
   {
    values: [
     {
       label: "November",
       value: 10
     },
     {
       label: "December",
       value: 18
     },
     {
       label: "January",
       value: 14
     },
     {
       label: "February",
       value: 14
     },
     {
       label: "March",
       value: 13
     },
     {
       label: "April",
       value: 140
     }
   ],
   color: secondary1,
   title: "House2 $/month"
  }
  ,  
   {
    values: [
     {
       label: "December",
       value: 0
     },
     {
       label: "January",
       value: 0
     },
     {
       label: "February",
       value: 0
     },
     {
       label: "February",
       value: 0
     },
     {
       label: "March",
       value: 0
     },
     {
       label: "April",
       value: 20
     }
   ],
   color: secondary2,
   title: "House3 $/month"
  }
  ];
    return (
      //colors 
      <div className="col-12 vh-100 mt-3  d-flex justify-content-lg-center align-items-lg-center">
        <div className="row h-100">
          <div className=" col-lg-8  d-flex justify-content-center ">
            <div className="row ">
              <div className=" col-lg-6 mb-3 d-flex align-items-center justify-content-center">
                <div
                  className="card w-75 p-2 ml-5"
                  style={{ backgroundColor: verde, color: "#fff" }}
                >
                  <div className="card-body text-center">
                    <i className="material-icons"> domain</i>
                    <h3>Houses { this.props.housesLength}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-3  d-flex align-items-center justify-content-center">
                <div
                  className="card  w-75 p-2"
                  style={{ backgroundColor: "#fff", color: pDark }}
                >
                  <div className="card-body text-center ">
                  <i className="material-icons">supervisor_account </i>
                    <h3>Tenants 3</h3>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 mb-3 d-flex align-items-start justify-content-center">
                <div
                  className="card  w-75 p-2 ml-5"
                  style={{ backgroundColor: "#fff", color:  pDark}}
                >
                  <div className="card-body text-center ">
                    <i className="material-icons">payment</i>
                    <h3>Payments {this.props.plansLength}</h3>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 mb-3 d-flex align-items-start justify-content-center">
                <div
                  className="card w-75 p-2"
                  style={{ backgroundColor: verde, color: "#fff" }}
                >
                  <div className="card-body text-center ">
                    <i className="material-icons">account_balance_wallet</i>
                    <h3>Balance 3,5 mln</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHART SPACE */}
          <div className="col-sm-12 col-lg-4 d-flex align-items-center justify-content-center">
              <BarChart
                data={chartValues} 
              />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if(state.houseReducer.houses && state.planReducer.plans){
    return {
      housesLength: state.houseReducer.houses.length,
      plansLength: state.planReducer.plans.length
    }
  }
  return { 
    housesLenght:0,
    plansLength: 0
  }
}

export default connect(mapStateToProps)(Dashboard);
