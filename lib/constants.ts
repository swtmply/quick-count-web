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
  if (value >= 10000000) {
    return "#FA0606";
  } else if (value >= 7500001 && value <= 10000000) {
    return "#FB3939";
  } else if (value >= 5000001 && value <= 7500000) {
    return "#FC7676";
  } else if (value >= 250000 && value <= 5000000) {
    return "#FDB5B5";
  } else {
    return "#FEE2E2";
  }
};

export const getPresidentColor = (name: string) => {
  if (name === "PR_5" || name === "VP_9") {
    // Ping - Sotto
    return "#102354";
  } else if (name === "PR_3" || name === "VP_6") {
    // Isko - Willie
    return "#6D96FF";
  } else if (name === "PR_7") {
    // BBM
    return "#E6140A";
  } else if (name === "PR_9" || name === "VP_1") {
    // Pacq - Lito
    return "#002FA8";
  } else if (name === "PR_10" || name === "VP_7") {
    // Leni - Kiko
    return "#FD3595";
  } else if (name === "VP_4") {
    // Sara
    return "#18A821";
  } else {
    return "#FFFDFD"; // Others
  }
};
