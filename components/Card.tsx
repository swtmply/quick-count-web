import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import CandidateList from "./CandidateList";
import { useQuery } from "react-query";
import { getCandidates } from "../lib/queries";
import { SelectedPositionContext } from "../context/SelectedPosition";
import { Position } from "../pages";

const Card = ({ position }: { position: Position }) => {
  const { setSelectedPosition } = useContext(SelectedPositionContext);

  return (
    <motion.div
      layoutId={position.position_code}
      className={`flex flex-col col-span-full shadow-md p-4 rounded-md bg-white`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{position.position}</h2>
        <button
          onClick={() => {
            setSelectedPosition(position);
          }}
          className={classNames("bg-[#1774D1]", "p-2 rounded-full")}
        >
          <ArrowsExpandIcon className="w-5 h-5 text-white" />
        </button>
      </div>
      <hr className="my-2" />
      <div className="flex text-xs uppercase font-bold text-neutral-400 mb-2">
        <p className="w-12 mr-1">Rank</p>
        <div className="w-full flex justify-between">
          <p>Name</p>
          <p className="text-right">Votes</p>
        </div>
      </div>
      <CandidateList position_code={position.position_code} />
    </motion.div>
  );
};

export default Card;
