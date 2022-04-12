import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import { PencilAltIcon, XIcon } from "@heroicons/react/outline";

const IncidentModal = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  if (!selectedItem) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 cursor-pointer flex justify-center items-center"
      onClick={() => setSelectedItem(null)}
    >
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          layoutId={selectedItem!}
          className="p-4 bg-white rounded-md cursor-default w-[60vw] overflow-y-auto max-h-[85vh]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">
                <span className="text-sm font-semibold mr-2">
                  Incident Reference Number:
                </span>{" "}
                REF_0892031
              </h2>
              <button
                onClick={() => {
                  setSelectedItem(null);
                }}
                className="bg-[#1774D1]/40 p-2 rounded-full"
              >
                <XIcon className="w-5 h-5 text-[#1774D1]" />
              </button>
            </div>

            <div className="flex justify-between">
              <h2 className="text-xl font-bold">
                <span className="text-sm font-semibold mr-2">Title:</span> May
                barilan d2
              </h2>
              <h2 className="text-xl font-bold">
                <span className="text-sm font-semibold mr-2">
                  Incident Type:
                </span>{" "}
                Logistical
              </h2>
            </div>
          </div>

          <hr className="my-2" />
          <div className="flex mt-5">
            <h2 className="text-xl font-bold flex gap-2 items-center">
              Details:{" "}
              <button className="text-sm px-4 py-2 rounded text-blue-900 bg-blue-100 flex gap-1">
                Edit
                <PencilAltIcon className="w-5 h-5" />
              </button>
            </h2>
          </div>

          <h2 className="text-xl font-bold my-4">
            <span className="text-sm font-semibold mr-2">
              Cluster Precinct:
            </span>{" "}
            01010015
          </h2>

          <div className="flex gap-10">
            <h2 className="text-xl font-bold">
              <span className="text-sm font-semibold mr-2">Location:</span>{" "}
              Abra, Bengued, CAR
            </h2>
            <h2 className="text-xl font-bold">
              <span className="text-sm font-semibold mr-2">
                Polling Center:
              </span>{" "}
              AGTANGAO ELEMENTARY SCHOOL
            </h2>
          </div>

          <hr className="my-2" />
          <div className="flex my-5">
            <h2 className="text-xl font-bold">Body:</h2>
          </div>

          <p>
            bigla na lang p my pumsok d2 mga armadu lalaki nagpaputok kya ntgil
            muna d2 eleksyon.
          </p>

          <div className="float-right flex gap-2 mt-5">
            <button className="px-4 py-2 rounded text-sm text-blue-900 bg-blue-100">
              Cancel
            </button>
            <button className="px-4 py-2 rounded text-sm text-white bg-blue-900">
              Mark as resolved
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IncidentModal;
