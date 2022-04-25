import { ArcElement, Chart, Legend } from "chart.js";
import classNames from "classnames";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";
import { getTopCandidates } from "../lib/queries";
import { Candidate } from "../types";
import LoadingSpinner from "./LoadingSpinner";

Chart.register(ArcElement, Legend);

const RingChart = () => {
  const { data, isLoading } = useQuery("top-votes", () => getTopCandidates(4), {
    refetchInterval: 10000,
  });

  return (
    <div className="bg-white shadow-md rounded p-4 flex items-center gap-5 h-[40vh] w-max">
      <div className="flex items-center h-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Doughnut
            data={{
              labels: data.map(
                (candidate: Candidate) => candidate.candidate_name
              ),
              datasets: [
                {
                  data: data.map(
                    (candidate: Candidate) => candidate.submitted_vote
                  ),
                  backgroundColor: ["#6050DC", "#D52DB7", "#FF2E7E", "#FF6B45"],
                },
              ],
            }}
            options={{
              aspectRatio: 1,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Presidential Votes Graph</h1>
        {data?.map((data: any, idx: number) => (
          <ChartLabel
            key={idx}
            index={idx}
            text={data.candidate_name}
            percentage={data.vote_percentage}
          />
        ))}
      </div>
    </div>
  );
};

const ChartLabel = ({
  text,
  index,
  percentage,
}: {
  text: string;
  index: number;
  percentage: number;
}) => {
  return (
    <div className="flex items-center gap-2 justify-between space-x-6">
      <div className="flex items-center space-x-2">
        <div
          className={classNames(
            index === 0 && "bg-chart-100",
            index === 1 && "bg-chart-200",
            index === 2 && "bg-chart-300",
            index === 3 && "bg-chart-400",
            "w-5 h-5"
          )}
        ></div>
        <p className="text-sm">{text}</p>
      </div>

      <p className="text-right font-bold">{percentage}%</p>
    </div>
  );
};

export default RingChart;
