import { XIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { SelectedPositionContext } from "../context/SelectedPosition";
import AllCandidateList from "./CandidateList/AllCandidateList";

const ModalCard = () => {
  const { selectedPosition, setSelectedPosition } = useContext(
    SelectedPositionContext
  );

  return (
    <>
      {selectedPosition && (
        <div
          className="fixed inset-0 bg-black/40 z-50 cursor-pointer flex justify-center items-center"
          onClick={() => setSelectedPosition(null)}
        >
          <AnimatePresence>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              layoutId={selectedPosition.position_code}
              className="p-4 bg-white rounded-md cursor-default w-[80vw] overflow-y-auto max-h-[85vh]"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {selectedPosition.position}
                </h2>
                <button
                  onClick={() => {
                    setSelectedPosition(null);
                  }}
                  className="bg-[#1774D1]/40 p-2 rounded-full"
                >
                  <XIcon className="w-5 h-5 text-[#1774D1]" />
                </button>
              </div>

              <hr className="my-2" />

              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs uppercase font-bold text-neutral-400 mb-4">
                    <th className="text-center w-2 pr-2">Rank</th>
                    <th>Name</th>
                    <th className="text-right">Vote Percentage</th>
                    <th className="text-right">Votes</th>
                  </tr>
                </thead>

                <AllCandidateList
                  position_code={selectedPosition.position_code}
                />
              </table>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default ModalCard;
