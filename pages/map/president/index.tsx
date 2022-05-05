import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import PresidentMapLayout from "../../../components/PresidentMapLayout";
import query from "../../../lib/db";

const PresidentMaps = dynamic(
  () => import("../../../components/Maps/PresidentMap"),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const candidateVotes = await query({
    query: 'SELECT * FROM `top_pr_candidate_per_region` WHERE client_id="01"',
  });

  return {
    props: { candidateVotes: JSON.parse(JSON.stringify(candidateVotes)) },
  };
};

const PresidentMap = ({ candidateVotes }: { candidateVotes: any }) => (
  <PresidentMapLayout votes={candidateVotes}>
    <PresidentMaps
      votes={candidateVotes.map((vote: any) => ({
        region: vote.region_name,
        submitted_vote: vote.submitted_vote,
        candidate_name: vote.candidate_name,
        region_code: vote.region_code,
        candidate_id: vote.candidate_id,
      }))}
    />
  </PresidentMapLayout>
);

export default PresidentMap;
