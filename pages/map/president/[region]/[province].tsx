import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { useQuery } from "react-query";
import { Votes } from "../../../../components/Maps/MunicipalMap";
import PresidentMapLayout from "../../../../components/PresidentMapLayout";
import query from "../../../../lib/db";
import { getMapNCR } from "../../../../lib/queries";
import { sessionOptions } from "../../../../lib/session";

const MunicipalMap = dynamic(
  () => import("../../../../components/Maps/MunicipalMap"),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (ctx) => {
    const user = ctx.req.session.user;

    const outsideManilaVotes = await query({
      query: `SELECT * FROM top_pr_candidate_per_mun WHERE region_code='NCR' AND prov_code != '39' AND client_id=${user?.client_id};`,
    });

    const manilaVotes = await query({
      query: `SELECT * FROM top_pr_candidate_per_prov WHERE prov_code='39' AND client_id=${user?.client_id}`,
    });

    return {
      props: {
        outsideManilaVotes: JSON.parse(JSON.stringify(outsideManilaVotes)),
        manilaVotes: JSON.parse(
          JSON.stringify({
            candidate_id: manilaVotes[0]?.candidate_id,
            candidate_name: manilaVotes[0]?.candidate_name,
            mun_name: manilaVotes[0]?.province_name,
            submitted_vote: manilaVotes[0]?.submitted_vote,
          })
        ),
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
  outsideManilaVotes: Votes[];
  manilaVotes: Votes;
}

const Municipal = ({ outsideManilaVotes, manilaVotes }: MunicipalMapPage) => {
  const { data } = useQuery("map-ncr-pr", () => getMapNCR("pr"), {
    initialData: [...outsideManilaVotes, manilaVotes],
    refetchInterval: 5000,
  });

  return (
    <PresidentMapLayout
      votes={data.filter((vote: Votes) => {
        if (Object.keys(vote).length === 0) {
          return false;
        }

        return true;
      })}
      type="PR"
    >
      <MunicipalMap
        type="PR"
        votes={data.filter((vote: Votes) => {
          if (Object.keys(vote).length === 0) {
            return false;
          }

          return true;
        })}
      />
    </PresidentMapLayout>
  );
};

export default Municipal;
