import NumberFormat from "react-number-format";
import ProgressBar from "../ProgressBar";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getAllVotesPerMunicipality } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";

const MunicipalityCandidateList = ({
  position_code,
  municipality,
}: {
  position_code: string;
  municipality: string;
}) => {
  // TODO Get candidates votes (per region/province/municipality)
  const { data: votes, isLoading } = useQuery(
    ["votes", municipality, position_code],
    () => getAllVotesPerMunicipality(municipality, position_code),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        // <pre>{JSON.stringify(filteredCandidates, null, 2)}</pre>
        <motion.ul className="flex flex-col gap-2">
          {votes.map((candidate: any, idx: number) => {
            const name = candidate?.candidate_name.split(", ");

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

export default MunicipalityCandidateList;
