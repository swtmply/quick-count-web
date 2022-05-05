/* eslint-disable @next/next/no-sync-scripts */
import dynamic from "next/dynamic";
import React from "react";

import { GetServerSideProps } from "next";
import query from "../../../lib/db";
import PresidentMapLayout from "../../../components/PresidentMapLayout";

const ProvinceMap = dynamic(
  () => import("../../../components/Maps/PresidentProvinceMap"),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { region } = ctx.query;

  const candidateVotes = await query({
    query: `SELECT * FROM top_pr_candidate_per_prov WHERE region_code="${region}" AND client_id="01"`,
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
};

const Chart = ({
  candidateVotes,
  regions,
}: {
  candidateVotes: any;
  regions: any;
}) => {
  return (
    <PresidentMapLayout votes={candidateVotes}>
      <ProvinceMap
        regions={regions}
        votes={candidateVotes.map((vote: any) => ({
          prov_name: vote.province_name,
          submitted_vote: vote.submitted_vote,
          candidate_name: vote.candidate_name,
          candidate_id: vote.candidate_id,
        }))}
      />
    </PresidentMapLayout>
  );
};

export default Chart;
