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
      query: `SELECT * FROM top_vp_candidate_per_mun WHERE region_code='NCR' AND prov_code != '39' AND client_id=${user?.client_id};`,
    });

    const manilaVotes = await query({
      query: `SELECT * FROM top_vp_candidate_per_prov WHERE prov_code='39' AND client_id=${user?.client_id}`,
    });

    const municipals = await query({
      query: `SELECT * FROM refmunicipal WHERE reg_id='NCR' AND prov_id != '39'`,
    });

    return {
      props: {
        outsideManilaVotes: JSON.parse(JSON.stringify(outsideManilaVotes)),
        manilaVotes: JSON.parse(JSON.stringify(manilaVotes[0])),
        municipals: JSON.parse(JSON.stringify(municipals)),
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
  const { data } = useQuery("map-ncr-pr", () => getMapNCR("vp"), {
    initialData: [...outsideManilaVotes, manilaVotes],
    refetchInterval: 1000,
  });
  return (
    <PresidentMapLayout votes={data} type="VP">
      <MunicipalMap type="VP" votes={data} />
    </PresidentMapLayout>
  );
};

export default Municipal;
