import { useQuery } from "react-query";
import { getAllVotesPerMunicipality } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";
import { useState } from "react";
import { slicePosition } from "../../lib/constants";
import Votes from "../Votes";

const MunicipalityCandidateList = ({
  position_code,
  municipality,
  prov_code,
}: {
  position_code: string;
  municipality: string;
  prov_code: string;
}) => {
  const { data: votes, isLoading } = useQuery(
    ["votes", `${municipality}${position_code}${prov_code}`],
    () => getAllVotesPerMunicipality(municipality, position_code, prov_code),
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

export default MunicipalityCandidateList;
