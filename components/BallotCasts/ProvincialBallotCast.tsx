import React from "react";
import NumberFormat from "react-number-format";
import { useQuery } from "react-query";
import { getProvincialBallotCast } from "../../lib/queries";
import LoadingSpinner from "../LoadingSpinner";

const ProvincialBallotCast = ({ province }: { province: string }) => {
  const { data, isLoading } = useQuery(["ballotcast", province], () =>
    getProvincialBallotCast(province)
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

export default ProvincialBallotCast;
