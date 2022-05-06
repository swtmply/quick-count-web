/* eslint-disable @next/next/no-sync-scripts */
import dynamic from "next/dynamic";
import React from "react";

import { GetServerSideProps } from "next";
import query from "../../../../lib/db";
import PresidentMapLayout from "../../../../components/PresidentMapLayout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../../../lib/session";
import { useQuery } from "react-query";
import { getMapProv } from "../../../../lib/queries";

const ProvinceMap = dynamic(
  () => import("../../../../components/Maps/PresidentProvinceMap"),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (ctx) => {
    const { region } = ctx.query;
    const user = ctx.req.session.user;

    const candidateVotes = await query({
      query: `SELECT * FROM top_pr_candidate_per_prov WHERE region_code="${region}" AND client_id=${user?.client_id}`,
    });

    const regions = await query({
      query: `SELECT * FROM refprovince WHERE reg_id='${region}'`,
    });

    return {
      props: {
        candidateVotes: JSON.parse(JSON.stringify(candidateVotes)),
        regions: JSON.parse(JSON.stringify(regions)),
        region,
      },
    };
  },
  sessionOptions
);

const Chart = ({
  candidateVotes,
  regions,
  region,
}: {
  candidateVotes: any;
  regions: any;
  region: any;
}) => {
  const { data } = useQuery("map-prov-pr", () => getMapProv(region, "pr"), {
    initialData: candidateVotes,
    refetchInterval: 5000,
  });

  return (
    <PresidentMapLayout votes={data} type="PR">
      <ProvinceMap
        type="PR"
        regions={regions}
        votes={data.map((vote: any) => ({
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
