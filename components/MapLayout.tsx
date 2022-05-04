import React from "react";
import { getColor } from "../lib/constants";
import Legend from "./Maps/Legend";
import { Votes } from "./Maps/RegionMap";
import ProgressBar from "./ProgressBar";

interface MapLayoutInterface {
  children: React.ReactNode;
  votes: Votes[];
}

const MapLayout = ({ children, votes }: MapLayoutInterface) => {
  return (
    <div className="grid grid-cols-2">
      <div className="overflow-auto p-4">
        <h2 className="font-bold text-2xl mb-8">{votes[0].candidate_name}</h2>

        <p>Votes Legend:</p>
        <Legend />

        {votes.map((vote, idx: number) => (
          <div key={idx} className="py-2">
            <p>{vote.region_name || vote.prov_name}</p>
            <ProgressBar
              backgroundColor={`bg-[${getColor(vote.submitted_vote)}]`}
              height={5}
              percent={50}
            />
            <p>{vote.submitted_vote}</p>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default MapLayout;
