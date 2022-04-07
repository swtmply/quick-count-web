import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Card from "../components/Card";
import FilterButton from "../components/FilterButton";
import { Layout } from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ModalCard from "../components/ModalCard";
import { useFilteredItems } from "../context/FilteredItems";
import { getPositions } from "../lib/queries";

export interface Position {
  position_id: string;
  position: string;
  position_code: string;
  level_id: string;
}

const Home: NextPage = () => {
  const { data, isLoading } = useQuery("positions", getPositions);
  const [items, setItems] = useState<string[]>([]);
  const { filteredItems, setFilteredItems } = useFilteredItems();

  useEffect(() => {
    if (data) {
      setFilteredItems(data.positions);
      setItems(data.positions.map((item: Position) => item.position));
    }
  }, [data]);

  return (
    <>
      <Layout>
        <div className="col-span-full my-8 flex justify-between items-center">
          <h1 className="font-bold text-3xl">Live counting of votes</h1>

          <FilterButton items={items} title="Positions" setItems={setItems} />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div className="col-span-full grid grid-cols-12 auto-rows-max gap-10">
            {filteredItems
              .filter((position: Position) => {
                if (items.find((item) => item === position.position)) {
                  return position;
                }
              })
              .map((position: Position) => (
                <Card key={position.position_id} position={position} />
              ))}
          </motion.div>
        )}
      </Layout>
      <ModalCard />
    </>
  );
};

export default Home;
