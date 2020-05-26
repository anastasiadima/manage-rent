import React, { Component } from "react";
import Chart from "chart.js";
import "./bar-chart.css";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const valuesArr = this.props.data.map(ar => ar.values);
    const colors = this.props.data.map(ar => ar.color);
    const title = this.props.data.map(ar => ar.title);
    var dataset = [];
    var labels = valuesArr[0].map(obj => obj.label);
    var index = 0;
    valuesArr.forEach(valueArr => {
      var values = valueArr.map(d => d.value);
      var data = {
        data: values,
        label: title[index],
        backgroundColor: "#f98eb1",
        borderColor: colors[index],
        fill: false,
        aspectRatio: 1
      };
      index++;
      dataset.push(data);
    });

    this.mychartRef = new Chart(this.chartRef.current, {
      type: "line",

      data: {
        labels: labels,
        datasets: dataset
      },
      options: {
        maintainAspectRatio: false
      }
    });
  }

  render() {
    return (
      <div className="chart-container">
        <canvas id="chart-canvas" ref={this.chartRef} />
      </div>
    );
  }
}

export default BarChart;
