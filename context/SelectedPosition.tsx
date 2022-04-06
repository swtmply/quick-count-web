import React, { createContext, useState } from "react";
import { Position } from "../pages";
import { Candidate } from "../types";

export interface SelectedPosition {
  selectedPosition: Position | null;
  setSelectedPosition: React.Dispatch<React.SetStateAction<Position | null>>;
  candidateList: Candidate[];
  setCandidateList: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

export const SelectedPositionContext = createContext<SelectedPosition>({
  selectedPosition: null,
  setSelectedPosition: () => null,
  candidateList: [],
  setCandidateList: () => null,
});

const SelectedPositionProvider: React.FC = ({ children }) => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );
  const [candidateList, setCandidateList] = useState<Candidate[]>([]);

  return (
    <SelectedPositionContext.Provider
      value={{
        selectedPosition,
        setSelectedPosition,
        candidateList,
        setCandidateList,
      }}
    >
      {children}
    </SelectedPositionContext.Provider>
  );
};

export default SelectedPositionProvider;
