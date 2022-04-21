import { motion } from "framer-motion";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Card from "../components/Card";
import FilterButton from "../components/FilterButton";
import { Layout } from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ModalCard from "../components/ModalCard";
import { useFilteredItems } from "../context/FilteredItems";
import { getBallotCasts, getPositions } from "../lib/queries";
import { sessionOptions } from "../lib/session";
import NumberFormat from "react-number-format";
import RingChart from "../components/RingChart";

export interface Position {
  position_id: string;
  position: string;
  position_code: string;
  level_id: string;
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);

const Home: NextPage = () => {
  const { data, isLoading } = useQuery("positions", getPositions);
  const { data: ballotCount, isLoading: ballotCountLoading } = useQuery(
    "ballot-count",
    getBallotCasts,
    {
      refetchInterval: 10000,
    }
  );
  const [items, setItems] = useState<string[]>([]);
  const { filteredItems, setFilteredItems } = useFilteredItems();

  useEffect(() => {
    if (data) {
      setFilteredItems(data.positions);
      setItems(data.positions.map((item: Position) => item.position));
    }
  }, [data, setFilteredItems]);

  return (
    <>
      <Layout>
        {/* <div className="col-span-full grid grid-cols-8 gap-3">
          <div className="col-span-5 bg-white shadow-md rounded p-4 divide-x grid grid-cols-3">
            <RingChart />
            <RingChart />
            <RingChart />
          </div>
        </div> */}

        <div className="col-span-full my-8 flex justify-between items-center">
          <h1 className="font-bold text-3xl">Live counting of votes</h1>

          <FilterButton items={items} title="Positions" setItems={setItems} />
        </div>

        <div className="col-span-full flex justify-end">
          <span className="italic">
            {ballotCountLoading ? (
              <LoadingSpinner />
            ) : (
              <p>
                Total ballot cast:
                <NumberFormat
                  value={ballotCount[0].total_ballot_cast}
                  className="text-right font-bold min-w-[40px] ml-2"
                  thousandSeparator={true}
                  displayType="text"
                />
              </p>
            )}
          </span>
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
