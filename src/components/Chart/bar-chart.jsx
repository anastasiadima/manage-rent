import React, { Component } from "react";
import Chart from "chart.js";
import "./bar-chart.css";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.mychartRef = new Chart(this.chartRef.current, {
      type: "bar",
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [
          {
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.color,
            aspectRatio: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false
      }
    });
  }


  render() {
     
    return (
      <div className="chart-container" >
        <canvas  id="chart-canvas" ref={this.chartRef} />
      </div>
    );
  }
}

export default BarChart;
