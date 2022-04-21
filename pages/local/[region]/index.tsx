import { ArrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Position } from "../..";
import CandidateList from "../../../components/CandidateList/CandidateList";
import ProvincialCandidateList from "../../../components/CandidateList/ProvincialCandidateList";
import FilterButton from "../../../components/FilterButton";
import { Layout } from "../../../components/Layout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import VoteTab from "../../../components/VoteTab";
import { useFilteredItems } from "../../../context/FilteredItems";
import {
  getCandidatesByLevel,
  getPositionsByLevel,
  getProvinces,
} from "../../../lib/queries";
import { Province } from "../../national/[region]";

const Region = () => {
  const router = useRouter();
  const reg_id: string = router.query.region as string;

  const { data, isLoading } = useQuery(["regions", reg_id], () =>
    getProvinces(reg_id)
  );
  const positionsQuery = useQuery(["positions", "local", reg_id], () =>
    getPositionsByLevel("2")
  );

  const [items, setItems] = useState<string[]>([]);
  const { filteredItems, setFilteredItems } = useFilteredItems();

  useEffect(() => {
    if (data) {
      setItems(data.provinces.map((province: Province) => province.province));
      setFilteredItems(data.provinces);
    }
  }, [data, setFilteredItems]);

  return (
    <Layout>
      <div className="col-span-full my-8 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Local</h1>

        <FilterButton items={items} title="Regions" setItems={setItems} />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="col-span-full flex flex-col gap-14">
          {filteredItems
            .filter((province: Province) => {
              if (items.find((item) => item === province.province)) {
                return province;
              }
            })
            .map((province: Province) => (
              <div className="w-full flex flex-col gap-2" key={province.id}>
                <Link href={`/local/${reg_id}/${province.ref}`} passHref>
                  <a className="font-semibold text-lg flex space-x-2 cursor-pointer">
                    <span>{province.province}</span>
                    <div className="rounded-full bg-indigo-1000 text-white w-7 h-7 flex justify-center items-center">
                      <ArrowRightIcon className="w-5 h-5 " />
                    </div>
                  </a>
                </Link>
                {positionsQuery.data && (
                  <VoteTab
                    tabs={positionsQuery?.data.positions.map(
                      (position: Position) => ({
                        position: position.position,
                        content: (
                          <ProvincialCandidateList
                            province={province.ref}
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
