/* eslint-disable @next/next/no-sync-scripts */
import dynamic from "next/dynamic";
import React from "react";

import { GetServerSideProps } from "next";
import query from "../lib/db";
import { Candidate } from "../types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const candidateVotes = await query({
    query: "SELECT * FROM `report_vote_per_prov` WHERE candidate_id='PR_7'",
  });

  return {
    props: { candidateVotes: JSON.parse(JSON.stringify(candidateVotes)) },
  };
};

const Chart = ({ candidateVotes }: { candidateVotes: any }) => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <div className="bg-white">
      <MapWithNoSSR
        votes={candidateVotes.map((vote: any) => ({
          province: vote.prov_name,
          submitted_vote: vote.submitted_vote,
          candidate_name: vote.candidate_name,
        }))}
      />
    </div>
  );
};

export default Chart;
