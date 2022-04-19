import NumberFormat from "react-number-format";
import ProgressBar from "../ProgressBar";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getAllVotesPerMunicipality } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";
import { useState } from "react";
import { slicePosition } from "../../lib/constants";
import Votes from "../Votes";

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
  const [toSlice] = useState(() => {
    return slicePosition.find((p) => p.position === position_code)?.sliceNumber;
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        votes && <Votes votes={votes} toSlice={toSlice!} />
      )}
    </>
  );
};

export default MunicipalityCandidateList;
