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
    query: `SELECT A.*
    FROM report_vote_per_prov A, report_vote_per_prov B
    WHERE A.position_id="PR"
    AND A.reg_id='${region}'
    AND A.submitted_vote > B.submitted_vote
    GROUP BY prov_code;`,
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
          province: vote.prov_name,
          submitted_vote: vote.submitted_vote,
          candidate_name: vote.candidate_name,
          candidate_id: vote.candidate_id,
        }))}
      />
    </PresidentMapLayout>
  );
};

export default Chart;
