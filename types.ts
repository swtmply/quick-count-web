import React from "react";

export type ProgressBarProps = {
  backgroundColor: string;
  percent: number;
  height: number;
};

export interface Candidate {
  name: string;
  votes: number;
  votePercentage: number;
}

export type CardProgressBarColors = {
  [key: string]: { progressBarColor: string };
};

export type CardProps = {
  candidates: Candidate[];
  progressBarColor: string;
  setSelectedCard: (id: string) => void;
  title: string;
  width: string;
};

export type TabProps = {
  title: string;
  content: React.ReactNode;
};
