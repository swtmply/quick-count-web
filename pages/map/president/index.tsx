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
    query: `SELECT A.*
    FROM report_vote_per_region A, report_vote_per_region B
    WHERE A.candidate_id REGEXP 'PR_7|PR_10' 
    AND A.submitted_vote > B.submitted_vote
    GROUP BY region_code;`,
  });

  return {
    props: { candidateVotes: JSON.parse(JSON.stringify(candidateVotes)) },
  };
};

const PresidentMap = ({ candidateVotes }: { candidateVotes: any }) => {
  return (
    <PresidentMapLayout votes={candidateVotes}>
      {/* <pre>{JSON.stringify(candidateVotes, null, 2)}</pre> */}
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
};

export default PresidentMap;
