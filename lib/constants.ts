import { ChartDatasetProperties } from "chart.js";
import { SlicePosition } from "../types";

export const slicePosition: SlicePosition[] = [
  {
    position: "PR",
    sliceNumber: 3,
  },
  {
    position: "VP",
    sliceNumber: 3,
  },
  {
    position: "SEN",
    sliceNumber: 15,
  },
  {
    position: "PTLS",
    sliceNumber: 10,
  },
];

export const graphData = {
  labels: ["PR_1", "PR_2", "PR_3", "PR_4"],
  datasets: [
    {
      data: [10000, 1000, 100, 10],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 99, 132)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};

export const graphConfig = {
  type: "doughnut",
  data: graphData,
};

export const PAGE_SIZE = 10;

const imageRender = "<img src={`data:image/jpeg;base64,${image}`}>";
