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

export const getColor = (value: number) => {
  if (value <= 0) {
    return "#FFFDFD";
  } else if (value <= 50) {
    return "#FEE2E2";
  } else if (value <= 100) {
    return "#FDB5B5";
  } else if (value <= 200) {
    return "#FC7676";
  } else if (value > 1000) {
    return "#FB3939";
  } else {
    return "#FA0606";
  }
};

export const getPresidentColor = (name: string) => {
  if (name === "PR_5") {
    return "#102354";
  } else if (name === "PR_3") {
    return "#6D96FF";
  } else if (name === "PR_7") {
    return "#FF1A1A";
  } else if (name === "PR_9") {
    return "#002FA8";
  } else if (name === "PR_10") {
    return "#FD3595";
  } else {
    return "#FFFDFD";
  }
};
