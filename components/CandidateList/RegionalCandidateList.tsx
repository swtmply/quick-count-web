import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import ProgressBar from "../ProgressBar";
import { motion } from "framer-motion";
import { Candidate } from "../../types";
import { useQuery } from "react-query";
import { getAllVotesPerRegion, getCandidates } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";

const RegionalCandidateList = ({
  position_code,
  region,
}: {
  position_code: string;
  region: string;
}) => {
  // TODO: Get candidates
  const { data, isLoading } = useQuery(["position", position_code], () =>
    getCandidates(position_code)
  );

  // TODO: Get candidates votes (per region/province/municipality)
  const { data: votes, isLoading: votesLoading } = useQuery(
    ["votes", region],
    () => getAllVotesPerRegion(region)
  );

  const [filteredCandidates, setFilteredCandidates] = useState<any[]>([]);

  console.log(votes);

  useEffect(() => {
    if (data && votes)
      setFilteredCandidates(
        data.candidates.map((candidate: Candidate) => {
          const vote = votes.find(
            (vote: any) => vote.candidate_name === candidate.name
          );

          if (vote) {
            const candidateWithVotes = {
              ...candidate,
              vote_percentage: vote.vote_percentage,
              submitted_vote: vote.submitted_vote,
            };

            return candidateWithVotes;
          }
        })
      );
  }, [data, votes]);

  return (
    <>
      {isLoading && votesLoading ? (
        <LoadingSpinner />
      ) : (
        // <pre>{JSON.stringify(filteredCandidates, null, 2)}</pre>
        <motion.ul className="flex flex-col gap-2">
          {data &&
            votes &&
            filteredCandidates
              .sort((a, b) => (a.vote_percentage < b.vote_percentage ? 1 : 0))
              .map((candidate: any, idx: number) => {
                const name = candidate?.name.split(", ");

                if (candidate)
                  return (
                    <motion.li className="flex gap-1 items-center" key={idx}>
                      <p className="font-bold text-xl w-12 p-2">{idx + 1}</p>

                      <div className="w-full">
                        <div className="flex justify-between">
                          <p>
                            <span className="font-bold">{name[0]}, </span>
                            {name[1]}
                          </p>
                          <div className="flex gap-10">
                            <p className="font-bold">
                              {candidate.vote_percentage}%
                            </p>
                            <NumberFormat
                              value={candidate.submitted_vote}
                              className="text-right font-bold min-w-[40px]"
                              thousandSeparator={true}
                              displayType="text"
                            />
                          </div>
                        </div>
                        <ProgressBar
                          backgroundColor="bg-[#1774D1]"
                          height={10}
                          percent={candidate.vote_percentage}
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

export default RegionalCandidateList;
