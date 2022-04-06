import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Position } from "../../..";
import CandidateList from "../../../../components/CandidateList";
import { Layout } from "../../../../components/Layout";
import VoteTab from "../../../../components/VoteTab";
import {
  getCandidatesByLevel,
  getMunicipalities,
  getPositionsByLevel,
} from "../../../../lib/queries";

interface Municipality {
  municipal: string;
}

const Province = () => {
  const router = useRouter();
  const prov_id: string = router.query.province as string;

  const { data, isLoading } = useQuery(["regions", prov_id], () =>
    getMunicipalities(prov_id)
  );

  const positionsQuery = useQuery(["positions", "national"], () =>
    getPositionsByLevel("1")
  );
  const candidatesQuery = useQuery(["candidates", "national"], () =>
    getCandidatesByLevel("1")
  );

  if (isLoading) return <Layout>Loading....</Layout>;

  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">National</h1>

      <div className="col-span-full flex flex-col gap-14">
        {data &&
          data?.municipalities.map(
            (municipality: Municipality, idx: number) => (
              <div className="w-full flex flex-col gap-2" key={idx}>
                <p className="font-semibold text-lg">
                  {municipality.municipal}
                </p>
                {positionsQuery.data && candidatesQuery.data && (
                  <VoteTab
                    tabs={positionsQuery?.data.positions.map(
                      (position: Position) => ({
                        position: position.position,
                        content: (
                          <CandidateList
                            position_code={position.position_code}
                          />
                        ),
                      })
                    )}
                  />
                )}
              </div>
            )
          )}
      </div>

      {/* <div className="col-span-full flex gap-2">
        {data &&
          data?.municipalities.map(
            (municipality: Municipality, idx: number) => (
              <p key={idx}>{municipality.municipal}</p>
            )
          )}
      </div> */}
    </Layout>
  );
};

export default Province;
