/* eslint-disable @next/next/no-sync-scripts */
import dynamic from "next/dynamic";
import React from "react";

import { GetServerSideProps } from "next";
import query from "../../../../lib/db";
import MapLayout from "../../../../components/MapLayout";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../../../lib/session";

const ProvinceMap = dynamic(
  () => import("../../../../components/Maps/ProvinceMap"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (ctx) => {
    const { candidateId, region } = ctx.query;
    const user = ctx.req.session.user;

    const candidateVotes = await query({
      query: `SELECT * FROM report_vote_per_prov WHERE candidate_id="${candidateId}" AND reg_id="${region}" AND client_id=${user?.client_id}`,
    });

    const regions = await query({
      query: `SELECT * FROM refprovince WHERE reg_id='${region}'`,
    });

    return {
      props: {
        candidateVotes: JSON.parse(JSON.stringify(candidateVotes)),
        regions: JSON.parse(JSON.stringify(regions)),
      },
    };
  },
  sessionOptions
);

const Chart = ({
  candidateVotes,
  regions,
}: {
  candidateVotes: any;
  regions: any;
}) => {
  return (
    <MapLayout votes={candidateVotes}>
      <ProvinceMap
        regions={regions}
        votes={
          candidateVotes
            ? candidateVotes.map((vote: any) => ({
                prov_name: vote.prov_name,
                submitted_vote: vote.submitted_vote,
                candidate_name: vote.candidate_name,
              }))
            : []
        }
      />
    </MapLayout>
  );
};

export default Chart;
