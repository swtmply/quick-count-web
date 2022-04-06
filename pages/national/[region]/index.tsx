import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Position } from "../..";
import CandidateList from "../../../components/CandidateList";
import { Layout } from "../../../components/Layout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import VoteTab from "../../../components/VoteTab";
import {
  getCandidatesByLevel,
  getPositionsByLevel,
  getProvinces,
} from "../../../lib/queries";

interface Province {
  id: string;
  province: string;
  ref: string;
}

const Region = () => {
  const router = useRouter();
  const reg_id: string = router.query.region as string;

  const { data, isLoading } = useQuery(["regions", reg_id], () =>
    getProvinces(reg_id)
  );

  const positionsQuery = useQuery(["positions", "national"], () =>
    getPositionsByLevel("1")
  );
  const candidatesQuery = useQuery(["candidates", "national"], () =>
    getCandidatesByLevel("1")
  );

  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">National</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="col-span-full flex flex-col gap-14">
          {data &&
            data?.provinces.map((province: Province) => (
              <div className="w-full flex flex-col gap-2" key={province.id}>
                <Link href={`/national/${reg_id}/${province.ref}`} passHref>
                  <a className="font-semibold text-lg">{province.province}</a>
                </Link>
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
            ))}
        </div>
      )}
    </Layout>
  );
};

export default Region;
