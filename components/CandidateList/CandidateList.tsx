import NumberFormat from "react-number-format";
import ProgressBar from "../ProgressBar";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getAllVotes } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";
import React, { useState } from "react";
import { slicePosition } from "../../lib/constants";
import Votes from "../Votes";

const CandidateList = ({ position_code }: { position_code: string }) => {
  const { data: votes, isLoading } = useQuery(
    ["votes", position_code],
    () => getAllVotes(position_code),
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        votes && <Votes votes={votes} toSlice={toSlice!} />
      )}
    </>
  );
};

export default CandidateList;
