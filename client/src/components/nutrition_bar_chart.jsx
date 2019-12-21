import React from "react";
import Chart from "chart.js";

class NutritionBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    // const data = [25, 25, 50];
    const data = [this.props.fat, this.props.carb, this.props.protein];
    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: ["Carbs", "DailyCarbs", "Fats", "DailyFats", "Proteins", "DailyProteins"],
        datasets: [
          {
            label: "Macronutrients",
            data,
            backgroundColor: ["#F3CE08", "#689D46", "#57A8A3"]
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
          // labels: {
          //   usePointStyle: true
          // }
        }
      }
    });
  }

  render() {
    return <canvas id="myChart" ref={this.chartRef} />;
  }
}

export default NutritionBarChart;
