import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Position } from "..";
import RegionalBallotCast from "../../components/BallotCasts/RegionalBallotCast";
import CandidateList from "../../components/CandidateList/CandidateList";
import RegionalCandidateList from "../../components/CandidateList/RegionalCandidateList";
import FilterButton from "../../components/FilterButton";
import { Layout } from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import VoteTab from "../../components/VoteTab";
import { useFilteredItems } from "../../context/FilteredItems";
import {
  getRegions,
  getPositionsByLevel,
  getCandidatesByLevel,
} from "../../lib/queries";

export interface Region {
  id: string;
  reg_name: string;
  reg_id: string;
}

export default function National() {
  const { data, isLoading } = useQuery("regions", getRegions);
  const positionsQuery = useQuery(["positions", "national"], () =>
    getPositionsByLevel("1")
  );

  const [items, setItems] = useState<string[]>([]);
  const { filteredItems, setFilteredItems } = useFilteredItems();

  useEffect(() => {
    if (data) {
      setItems(data.regions.map((region: Region) => region.reg_name));
      setFilteredItems(data.regions);
    }
  }, [data, setFilteredItems, filteredItems]);

  return (
    <Layout>
      <div className="col-span-full my-8 flex justify-between items-center">
        <h1 className="font-bold text-3xl">National</h1>

        <FilterButton items={items} title="Regions" setItems={setItems} />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="col-span-full flex flex-col gap-14">
          {filteredItems
            .filter((region: Region) => {
              if (items.find((item) => item === region.reg_name)) {
                return region;
              }
            })
            .map((region: Region) => (
              <div className="w-full flex flex-col gap-2" key={region.id}>
                <div className="flex justify-between">
                  <Link href={`/national/${region.reg_id}`} passHref>
                    <a className="flex space-x-2 cursor-pointer font-semibold text-lg">
                      <span>{region.reg_name}</span>
                      <div className="rounded-full bg-indigo-1000 text-white w-7 h-7 flex justify-center items-center">
                        <ArrowRightIcon className="w-5 h-5 " />
                      </div>
                    </a>
                  </Link>
                  <RegionalBallotCast region={region.reg_id} />
                </div>
                {positionsQuery.data && (
                  <VoteTab
                    tabs={positionsQuery?.data.positions.map(
                      (position: Position) => ({
                        position: position.position,
                        content: (
                          <RegionalCandidateList
                            region={region.reg_id}
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
