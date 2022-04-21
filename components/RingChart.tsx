import { ArcElement, Chart } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { graphData } from "../lib/constants";

Chart.register(ArcElement);

const RingChart = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-32">
        <Doughnut
          data={graphData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RingChart;
