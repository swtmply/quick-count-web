import React from "react";
import { CardProps } from "../../types";
import classNames from "classnames";
import { XIcon } from "@heroicons/react/outline";
import CandidateList from "../CandidateList";

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
      <CandidateList
        candidates={candidates}
        progressBarColor={progressBarColor}
      />
    </div>
  );
};

export default FloatingCard;
