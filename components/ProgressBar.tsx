import React from "react";
import { ProgressBarProps } from "../types";

const ProgressBar = ({
  backgroundColor,
  percent,
  height,
}: ProgressBarProps) => {
  const progressStyles = {
    width: `${percent}%`,
    height: `${height}px`,
  };

  return (
    <div className={`w-full bg-neutral-200`}>
      <div
        style={progressStyles}
        className={`rounded-[inherit] h-full ${backgroundColor}`}
      >
        <span></span>
      </div>
    </div>
  );
};

export default ProgressBar;
