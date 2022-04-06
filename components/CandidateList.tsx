import React from "react";
import NumberFormat from "react-number-format";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";
import { Candidate } from "../types";
import { useQuery } from "react-query";
import { getCandidates } from "../lib/queries";
import LoadingSpinner from "./LoadingSpinner";

const CandidateList = ({ position_code }: { position_code: string }) => {
  // TODO: Get candidates
  const { data, isLoading } = useQuery(["position", position_code], () =>
    getCandidates(position_code)
  );

  // TODO: Get candidates votes

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <motion.ul className="flex flex-col gap-2">
          {data &&
            data.candidates
              // .sort((a, b) => (a.name > b.name ? 1 : 0))
              .map((candidate: Candidate, idx: number) => {
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
                          value={10000000}
                          className="text-right font-bold"
                          thousandSeparator={true}
                          displayType="text"
                        />
                      </div>
                      <ProgressBar
                        backgroundColor="bg-[#1774D1]"
                        height={10}
                        percent={50}
                      />
                    </div>
                  </motion.li>
                );
              })}
        </motion.ul>
      )}
    </>
  );
};

export default CandidateList;
