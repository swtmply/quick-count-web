import React from "react";
import { CardProps } from "../../types";
import NumberFormat from "react-number-format";
import ProgressBar from "../ProgressBar";
import classNames from "classnames";
import { XIcon } from "@heroicons/react/outline";

const FloatingCard = ({
  candidates,
  title,
  progressBarColor,
  setSelectedCard,
}: CardProps) => {
  return (
    <div className="flex flex-col justify-between w-[80vw] p-4 rounded-md bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={() => setSelectedCard("")}
          className={classNames(progressBarColor, "p-2 rounded-full")}
        >
          <XIcon className="w-5 h-5 text-white" />
        </button>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between text-xs uppercase font-bold text-neutral-400 mb-2">
        <p>Name</p>
        <p className="text-right">Votes</p>
      </div>
      <ul className="flex flex-col gap-2">
        {candidates.map((candidate, idx) => {
          const name = candidate.name.split(", ");

          return (
            <li className="flex flex-col gap-1" key={idx}>
              <div className="flex justify-between">
                <p>
                  <span className="font-bold">{name[0]}, </span>
                  {name[1]}
                </p>
                <NumberFormat
                  value={candidate.votes}
                  className="text-right font-bold"
                  thousandSeparator={true}
                  displayType="text"
                />
              </div>
              <ProgressBar
                backgroundColor={progressBarColor}
                height={10}
                percent={candidate.votePercentage}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FloatingCard;
