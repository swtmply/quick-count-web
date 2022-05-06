import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { Votes } from "../../../../components/Maps/MunicipalMap";
import PresidentMapLayout from "../../../../components/PresidentMapLayout";
import query from "../../../../lib/db";
import { sessionOptions } from "../../../../lib/session";

const NCRCandidateMap = dynamic(
  () => import("../../../../components/Maps/NCRCandidateMap"),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (ctx) => {
    const { candidateId } = ctx.query;
    const user = ctx.req.session.user;

    const manilaVotes = await query({
      query: `SELECT * FROM report_vote_per_muni WHERE region_code="NCR" AND client_id='${user?.client_id}' AND candidate_id='${candidateId}'`,
    });

    return {
      props: {
        manilaVotes: JSON.parse(JSON.stringify(manilaVotes)),
      },
    };
  },
  sessionOptions
);

export type Municipal = {
  municipal: string;
  mun_id: number;
};

interface MunicipalMapPage {
  manilaVotes: Votes[];
}

const Municipal = ({ manilaVotes }: MunicipalMapPage) => {
  return (
    <PresidentMapLayout votes={manilaVotes as any} type="PR">
      <NCRCandidateMap votes={manilaVotes} />
    </PresidentMapLayout>
  );
};

export default Municipal;
