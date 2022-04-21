import React from "react";
import NumberFormat from "react-number-format";
import { useQuery } from "react-query";
import { getMunicipalBallotCast } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";

const MunicipalBallotCast = ({
  province,
  municipal,
}: {
  province: string;
  municipal: string;
}) => {
  const { data, isLoading } = useQuery(
    ["ballotcast", province, municipal],
    () => getMunicipalBallotCast(province, municipal)
  );

  return (
    <div>
      <span className="italic">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <p>
            Total ballot cast:
            <NumberFormat
              value={data[0]?.total_ballot_cast || 0}
              className="text-right font-bold min-w-[40px] ml-2"
              thousandSeparator={true}
              displayType="text"
            />
          </p>
        )}
      </span>
    </div>
  );
};

export default MunicipalBallotCast;
