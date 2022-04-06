import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import Card from "../components/Card";
import { Layout } from "../components/Layout";
import ModalCard from "../components/ModalCard";
import { getPositions } from "../lib/queries";

export interface Position {
  position_id: string;
  position: string;
  position_code: string;
  level_id: string;
}

const Home: NextPage = () => {
  const { data, isLoading } = useQuery("positions", getPositions);

  if (isLoading) return <Layout>Loading...</Layout>;

  return (
    <>
      <Layout>
        <h1 className="font-bold text-3xl col-span-full my-8">
          Live counting of votes
        </h1>

        <motion.div className="col-span-full grid grid-cols-12 auto-rows-max gap-10">
          {data?.positions.map((position: Position) => {
            if (position.level_id === "1")
              return <Card key={position.position_id} position={position} />;
          })}
        </motion.div>
      </Layout>
      <ModalCard />
    </>
  );
};

export default Home;
