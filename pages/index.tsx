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

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dynamic from "next/dynamic";

const HiddenMap = dynamic(() => import("../components/Maps/HiddenMap"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

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
        <h1 className="font-bold text-3xl col-span-4 mb-4">Votes Statistics</h1>

        <div className="col-span-full grid grid-cols-8 gap-3">
          <div className="col-span-full flex gap-2">
            <RingChart />

            {ballotCountLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <CircularProgress
                  ballotCount={ballotCount}
                  title="Election Returns Transmitted"
                />

                <CircularProgress
                  ballotCount={ballotCount}
                  title="Voter Turnout"
                />
              </>
            )}
          </div>
        </div>

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
          <div className="col-span-full flex justify-center items-center w-full">
            <LoadingSpinner />
          </div>
        ) : (
          <motion.div className="col-span-full grid grid-cols-12 auto-rows-max gap-10">
            {filteredItems
              .filter((position: Position) => {
                if (items.find((item) => item === position.position)) {
                  return position;
                }
              })
              .map((position: Position, idx: number) => (
                <Card key={idx} position={position} />
              ))}
          </motion.div>
        )}
      </Layout>
      <HiddenMap />
      <ModalCard />
    </>
  );
};

export default Home;

type CircularProgressType = {
  ballotCount: any;
  title: string;
};

function CircularProgress({ ballotCount, title }: CircularProgressType) {
  const ERT =
    (ballotCount[0].transmitted_prec / ballotCount[0].total_precinct) * 100;
  const VT =
    (ballotCount[0].total_ballot_cast / ballotCount[0].total_voters) * 100;

  return (
    <div className="w-64 bg-white shadow-md rounded h-full p-4 flex flex-col justify-between items-center">
      <p className="font-bold text-center">{title}</p>
      <div className="w-32 h-32">
        <CircularProgressbar
          value={title !== "Voter Turnout" ? ERT : VT}
          text={`${(title !== "Voter Turnout" ? ERT : VT).toFixed(2)}%`}
          styles={buildStyles({
            pathColor: `rgba(96, 80, 220, ${
              title !== "Voter Turnout" ? ERT : VT
            })`,
            textColor: `rgb(96 80 220)`,
          })}
        />
      </div>
      <div className="text-sm text-center">
        {title !== "Voter Turnout" ? (
          <div>
            <NumberFormat
              value={ballotCount[0].transmitted_prec}
              thousandSeparator
              displayType="text"
            />{" "}
            out of{" "}
            <NumberFormat
              value={ballotCount[0].total_precinct}
              thousandSeparator
              displayType="text"
            />{" "}
            clustered precincts
          </div>
        ) : (
          <div>
            <NumberFormat
              value={ballotCount[0].total_ballot_cast}
              thousandSeparator
              displayType="text"
            />{" "}
            out of{" "}
            <NumberFormat
              value={ballotCount[0].total_voters}
              thousandSeparator
              displayType="text"
            />{" "}
            voters
          </div>
        )}
      </div>
    </div>
  );
}
