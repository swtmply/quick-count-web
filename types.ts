import React from "react";

export type ProgressBarProps = {
  backgroundColor: string;
  percent: number;
  height: number;
};

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Candidate {
  id?: number;
  submitted_vote: number;
  candidate_id: string;
  name: string;
  position_code: string;
  candidate_name: string;
}

export type CardProgressBarColors = {
  [key: string]: { progressBarColor: string };
};

export type TabProps = {
  position: string;
  content: React.ReactNode;
};

export interface SlicePosition {
  position: string;
  sliceNumber: number;
}
