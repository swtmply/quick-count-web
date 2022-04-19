import React from "react";
import NumberFormat from "react-number-format";
import ProgressBar from "./ProgressBar";

const Votes = ({ votes, toSlice }: { votes: []; toSlice: number }) => {
  return (
    <tbody>
      {votes.slice(0, toSlice).map((candidate: any, idx: number) => {
        const name = candidate?.candidate_name.split(", ");

        if (candidate)
          return (
            <React.Fragment>
              <tr className="text-left">
                <td
                  rowSpan={2}
                  className="font-bold text-xl text-center pr-2 py-2"
                >
                  {idx + 1}
                </td>
                <td className="pt-2">
                  <span className="font-bold">{name[0]}, </span>
                  {name[1]}
                </td>
                <td className="font-bold text-right">
                  {candidate.vote_percentage}%
                </td>
                <td className="text-right">
                  <NumberFormat
                    value={candidate.submitted_vote}
                    className="text-right font-bold min-w-[40px]"
                    thousandSeparator={true}
                    displayType="text"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="pb-2">
                  <ProgressBar
                    backgroundColor="bg-[#1774D1]"
                    height={10}
                    percent={candidate.vote_percentage}
                  />
                </td>
              </tr>
            </React.Fragment>
          );
      })}
    </tbody>
  );
};

export default Votes;