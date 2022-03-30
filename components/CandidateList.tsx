import React from "react";
import NumberFormat from "react-number-format";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";
import { Candidate } from "../types";

const CandidateList = ({
  candidates,
  progressBarColor,
}: {
  candidates: Candidate[];
  progressBarColor: string;
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {candidates
        // .sort((a, b) => (a.name > b.name ? 1 : 0))
        .map((candidate, idx) => {
          const name = candidate.name.split(", ");

          return (
            <motion.li className="flex gap-1 items-center" key={idx}>
              <p className="font-bold text-xl w-12 p-2">{idx + 1}</p>

              <div className="w-full">
                <div className="flex justify-between">
                  <p>
                    <span className="font-bold">{name[0]}, </span>
                    {name[1]}
                  </p>
                  <NumberFormat
                    value={candidate.votes}
                    className="text-right font-bold"
                    thousandSeparator={true}
                    displayType="text"
                  />
                </div>
                <ProgressBar
                  backgroundColor={progressBarColor}
                  height={10}
                  percent={candidate.votePercentage}
                />
              </div>
            </motion.li>
          );
        })}
    </ul>
  );
};

export default CandidateList;
