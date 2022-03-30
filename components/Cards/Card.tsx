import React from "react";
import { CardProps } from "../../types";
import { motion } from "framer-motion";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import CandidateList from "../CandidateList";

const Card = ({
  candidates,
  title,
  progressBarColor,
  setSelectedCard,
  width,
}: CardProps) => {
  return (
    <motion.div
      layoutId={title}
      className={`flex flex-col shadow-md ${width} p-4 rounded-md bg-white`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={() => setSelectedCard(title)}
          className={classNames(progressBarColor, "p-2 rounded-full")}
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
      <CandidateList
        candidates={candidates}
        progressBarColor={progressBarColor}
      />
    </motion.div>
  );
};

export default Card;
