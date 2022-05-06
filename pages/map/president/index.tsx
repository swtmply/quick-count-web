import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { useQuery } from "react-query";
import PresidentMapLayout from "../../../components/PresidentMapLayout";
import query from "../../../lib/db";
import { getMapRegion } from "../../../lib/queries";
import { sessionOptions } from "../../../lib/session";

const PresidentMaps = dynamic(
  () => import("../../../components/Maps/PresidentMap"),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const candidateVotes = await query({
      query: `SELECT * FROM top_pr_candidate_per_region WHERE client_id="${user?.client_id}"`,
    });

    return {
      props: { candidateVotes: JSON.parse(JSON.stringify(candidateVotes)) },
    };
  },
  sessionOptions
);

const PresidentMap = ({ candidateVotes }: { candidateVotes: any }) => {
  const { data } = useQuery("map-region-pr", () => getMapRegion("pr"), {
    initialData: candidateVotes,
    refetchInterval: 5000,
  });

  return (
    <PresidentMapLayout votes={data} type="PR">
      <PresidentMaps
        type="PR"
        votes={data.map((vote: any) => ({
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
