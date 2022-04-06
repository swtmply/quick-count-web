import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Position } from "..";
import CandidateList from "../../components/CandidateList";
import { Layout } from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import VoteTab from "../../components/VoteTab";
import {
  getRegions,
  getPositionsByLevel,
  getCandidatesByLevel,
} from "../../lib/queries";

interface Region {
  id: string;
  reg_name: string;
  reg_id: string;
}

export default function National() {
  const { data, isLoading } = useQuery("regions", getRegions);
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
            data?.regions.map((region: Region) => (
              <div className="w-full flex flex-col gap-2" key={region.id}>
                <Link href={`/national/${region.reg_id}`} passHref>
                  <a className="font-semibold text-lg">{region.reg_name}</a>
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
}
