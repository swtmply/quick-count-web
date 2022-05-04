import React from "react";
import { getPresidentColor } from "../lib/constants";
import { PresidentLegend } from "./Maps/Legend";
import { Votes } from "./Maps/RegionMap";
import ProgressBar from "./ProgressBar";

interface MapLayoutInterface {
  children: React.ReactNode;
  votes: Votes[];
}

const PresidentMapLayout = ({ children, votes }: MapLayoutInterface) => {
  return (
    <div className="grid grid-cols-2">
      <div className="overflow-auto p-4">
        <h1>Votes Legend:</h1>
        <PresidentLegend />

        {votes.map((vote, idx: number) => (
          <div key={idx} className="py-2">
            <p>{vote.region_name || vote.prov_name}</p>
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
  );
};

export default PresidentMapLayout;
