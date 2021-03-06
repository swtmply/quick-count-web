import NumberFormat from "react-number-format";
import ProgressBar from "../ProgressBar";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getAllVotesPerRegion } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";
import { useState } from "react";
import { slicePosition } from "../../lib/constants";
import Votes from "../Votes";

const RegionalCandidateList = ({
  position_code,
  region,
}: {
  position_code: string;
  region: string;
}) => {
  const { data: votes, isLoading } = useQuery(
    ["votes", region, position_code],
    () => getAllVotesPerRegion(region, position_code),
    {
      refetchInterval: 10000,
    }
  );
  const [toSlice] = useState(() => {
    return slicePosition.find((p) => p.position === position_code)?.sliceNumber;
  });

  return (
    <>
      {isLoading ? (
        <tbody>
          <tr>
            <td colSpan={4}>
              <LoadingSpinner />
            </td>
          </tr>
        </tbody>
      ) : (
        votes && <Votes votes={votes} toSlice={toSlice!} />
      )}
    </>
  );
};

export default RegionalCandidateList;
