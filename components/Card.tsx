import React from "react";
import { CardProps } from "../types";
import { motion } from "framer-motion";
import NumberFormat from "react-number-format";
import ProgressBar from "./ProgressBar";
import classNames from "classnames";

const Card = ({
  candidates,
  title,
  progressBarColor,
  setSelectedCard,
  type,
}: CardProps) => {
  let cardType: string;

  if (type === "small") {
    cardType = "cols-span-4";
  } else if (type === "big") {
    cardType = "cols-span-7";
  } else if (type === "floating") {
    cardType = "floating";
  } else {
    cardType = "";
  }

  return (
    <motion.div
      onClick={() => setSelectedCard(title)}
      layoutId={title}
      className={classNames(
        `flex flex-col justify-between shadow-md p-4 rounded-md bg-white cursor-pointer ${cardType}`
      )}
    >
      <h2 className="text-xl font-bold">{title}</h2>
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
    </motion.div>
  );
};

export default Card;
