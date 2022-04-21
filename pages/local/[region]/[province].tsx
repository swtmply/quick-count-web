import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Position } from "../..";
import CandidateList from "../../../components/CandidateList/CandidateList";
import MunicipalityCandidateList from "../../../components/CandidateList/MunicipalityCandidateList";
import FilterButton from "../../../components/FilterButton";
import { Layout } from "../../../components/Layout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import VoteTab from "../../../components/VoteTab";
import { useFilteredItems } from "../../../context/FilteredItems";
import {
  getCandidatesByLevel,
  getMunicipalities,
  getPositionsByLevel,
} from "../../../lib/queries";

export interface Municipality {
  mun_id: string;
  municipal: string;
}

const LocalProvince = () => {
  const router = useRouter();
  const prov_id: string = router.query.province as string;

  const { data, isLoading } = useQuery(["regions", prov_id], () =>
    getMunicipalities(prov_id)
  );

  const positionsQuery = useQuery(["positions", "national", prov_id], () =>
    getPositionsByLevel("3")
  );

  const [items, setItems] = useState<string[]>([]);
  const { filteredItems, setFilteredItems } = useFilteredItems();

  useEffect(() => {
    if (data) {
      setItems(
        data.municipalities.map(
          (municipality: Municipality) => municipality.municipal
        )
      );
      setFilteredItems(data.municipalities);
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
            .filter((municipality: Municipality) => {
              if (items.find((item) => item === municipality.municipal)) {
                return municipality;
              }
            })
            .map((municipality: Municipality, idx: number) => (
              <div className="w-full flex flex-col gap-2" key={idx}>
                <p className="font-semibold text-lg">
                  {municipality.municipal}
                </p>
                {positionsQuery.data && (
                  <VoteTab
                    tabs={positionsQuery?.data.positions.map(
                      (position: Position) => ({
                        position: position.position,
                        content: (
                          <MunicipalityCandidateList
                            prov_code={prov_id}
                            municipality={municipality.mun_id}
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

export default LocalProvince;
