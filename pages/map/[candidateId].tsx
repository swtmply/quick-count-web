/* eslint-disable @next/next/no-sync-scripts */
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

import { GetServerSideProps } from "next";
import query from "../../lib/db";
import MapLayout from "../../components/MapLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (ctx) => {
    const candidate_id = ctx.query.candidateId;
    const user = ctx.req.session.user;

    const candidateVotes = await query({
      query: `SELECT * FROM report_vote_per_region WHERE candidate_id='${candidate_id}' AND client_id=${user?.client_id}`,
    });

    return {
      props: { candidateVotes: JSON.parse(JSON.stringify(candidateVotes)) },
    };
  },
  sessionOptions
);

const Regions = ({ candidateVotes }: { candidateVotes: any }) => {
  const Map = React.useMemo(() => {
    const RegionMap = dynamic(() => import("../../components/Maps/RegionMap"), {
      ssr: false,
      loading: () => <LoadingSpinner />,
    });

    return RegionMap;
  }, []);

  return (
    <MapLayout votes={candidateVotes}>
      {/* <pre>{JSON.stringify(candidateVotes, null, 2)}</pre> */}
      <Map
        votes={candidateVotes.map((vote: any) => ({
          region: vote.region_name,
          submitted_vote: vote.submitted_vote,
          candidate_name: vote.candidate_name,
          region_code: vote.region_code,
          candidate_id: vote.candidate_id,
        }))}
      />
    </MapLayout>
  );
};

export default Regions;
