import React from "react";
import { getPresidentColor } from "../lib/constants";
import { MapNav } from "./Header/MapNav";
import { PresidentLegend, VicePresidentLegend } from "./Maps/Legend";
import { Votes } from "./Maps/RegionMap";
import ProgressBar from "./ProgressBar";

interface MapLayoutInterface {
  children: React.ReactNode;
  votes: Votes[];
  type: string;
}

const heatMapLabel = [
  "Presidential Election Heatmap",
  "Vice Presidential Election Heatmap",
];

const PresidentMapLayout = ({ children, votes, type }: MapLayoutInterface) => {
  return (
    <div className="overflow-x-hidden">
      <MapNav />

      <div className="grid grid-cols-2">
        <div className="overflow-auto p-4">
          <h2 className="font-bold text-2xl mb-8">
            {type === "PR"
              ? "Presidential Heat Map"
              : "Vice Presidential Heat Map"}
          </h2>

          <h1 className="mb-2">Votes Legend:</h1>

          {type == "PR" ? <PresidentLegend /> : <VicePresidentLegend />}

          <h2 className="font-bold text-2xl mb-4">
            {votes[0].region_name ? "Regions" : "Provinces"}
          </h2>
          {votes.map((vote, idx: number) => (
            <div key={idx} className="py-2">
              <p>{vote.region_name || vote.province_name || vote.mun_name}</p>
              <ProgressBar
                backgroundColor={`bg-[${getPresidentColor(vote.candidate_id)}]`}
                height={5}
                percent={100}
              />
              <p>{vote.submitted_vote}</p>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PresidentMapLayout;
