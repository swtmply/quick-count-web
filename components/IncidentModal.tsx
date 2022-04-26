import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import { PencilAltIcon, XIcon } from "@heroicons/react/outline";
import { Incident } from "../pages/dashboard";
import { getImageIncidentReport, updateIncidentStatus } from "../lib/queries";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";

const IncidentModal = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: Incident | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<Incident | null>>;
}) => {
  const queryClient = useQueryClient();

  const { data: images, isLoading } = useQuery(
    ["image", selectedItem?.id],
    () =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getImageIncidentReport(selectedItem!.ref_id!)
  );

  const { mutate } = useMutation(updateIncidentStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("incidents");
    },
  });

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
          layoutId={selectedItem?.id.toString()}
          className="p-4 bg-white rounded-md cursor-default w-[60vw] overflow-y-auto max-h-[85vh]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">
                <span className="text-sm font-semibold mr-2">
                  Incident Reference Number:
                </span>{" "}
                {selectedItem.ref_id}
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
                <span className="text-sm font-semibold mr-2">
                  Incident Type:
                </span>{" "}
                {selectedItem.type || "None"}
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
            {selectedItem.pollplace_id || selectedItem.precinct_id}
          </h2>

          <div className="flex gap-10">
            <h2 className="text-xl font-bold">
              <span className="text-sm font-semibold mr-2">Location:</span>{" "}
              {selectedItem.pollstreet}
            </h2>
            <h2 className="text-xl font-bold">
              <span className="text-sm font-semibold mr-2">Polling Site:</span>{" "}
              {selectedItem.pollplace || "None"}
            </h2>
          </div>

          <hr className="my-2" />
          <div className="flex my-5">
            <h2 className="text-xl font-bold">Body:</h2>
          </div>

          <p>{selectedItem.details}</p>

          {/* Images */}
          <div>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {images.length !== 0 ? (
                  <>
                    <h2 className="text-xl font-bold my-3">Images:</h2>

                    <div className="flex gap-2">
                      {images?.map((data: any, key: number) => (
                        <Image
                          key={key}
                          src={`data:image/jpeg;base64,${data.image}`}
                          alt="Incident image"
                          width={200}
                          height={200}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          <div className="float-right flex gap-2 mt-5">
            <button
              className="px-4 py-2 rounded text-sm text-blue-900 bg-blue-100"
              onClick={() => setSelectedItem(null)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded text-sm text-white bg-blue-900"
              onClick={() => {
                mutate({
                  id: selectedItem.id,
                  newResolve:
                    selectedItem.status === "Resolved"
                      ? "Unresolved"
                      : "Resolved",
                });

                setSelectedItem(null);
              }}
            >
              Mark as{" "}
              {selectedItem.status === "Resolved" ? "Unresolved" : "Resolved"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IncidentModal;
