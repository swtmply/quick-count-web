/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  ArrowLeftIcon,
  PencilAltIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Image from "next/image";
import { Dropdown, Incident, incidentType } from ".";
import {
  getImageIncidentReport,
  updateIncidentStatus,
  updateIncidentType,
} from "../../lib/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AdminLayout } from "../../components/Layout";

import { GetServerSidePropsContext } from "next";

import { GetServerSideProps } from "next";
import query from "../../lib/db";
import { useRouter } from "next/router";
import ImagePopup from "../../components/ImagePopup";
import { useSelectedImage } from "../../context/SelectedImage";

const QUERY =
  "SELECT `incidents`.id, `incidents`.ref_id, `incidents`.details, `incidents`.precinct_id, `incidents`.pollplace_id, `incidents`.watcher_id, `incidents`.status, `incidents`.isRead, `incidents`.type, `incidents`.resolution, `precincts`.pollplace, `precincts`.`pollstreet` FROM `incidents` LEFT JOIN `precincts` ON `incidents`.precinct_id=`precincts`.`precinct_id` WHERE `incidents`.id=?";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const selectedItem = await query({
    query: QUERY,
    values: [ctx?.params?.incidentId],
  });

  return {
    props: { selectedItem: JSON.parse(JSON.stringify(selectedItem[0])) },
  };
};

const Incident = ({ selectedItem }: { selectedItem: Incident | null }) => {
  const queryClient = useQueryClient();

  const [resolution, setResolution] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(incidentType[1]);

  const router = useRouter();
  const { setSelectedImage } = useSelectedImage();

  const { data: images, isLoading } = useQuery(
    ["image", selectedItem?.id],
    () =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getImageIncidentReport(selectedItem!.ref_id!)
  );

  const { mutateAsync } = useMutation(updateIncidentStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("incidents");
    },
  });

  const { mutateAsync: typeMutate } = useMutation(updateIncidentType, {
    onSuccess: () => {
      queryClient.invalidateQueries("incidents");
    },
  });

  if (!selectedItem) return null;

  return (
    <>
      <AdminLayout>
        <div className="p-4 bg-white rounded-md cursor-default col-span-full overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <button
                className="bg-[#1774D1]/40 p-2 rounded-full"
                onClick={() => {
                  router.back();
                }}
              >
                <ArrowLeftIcon className="w-5 h-5 text-[#1774D1]" />
              </button>
              <h2 className="text-xl font-bold">
                <span className="text-sm font-semibold mr-2">
                  Incident Reference Number:
                </span>{" "}
                {selectedItem.ref_id}
              </h2>
            </div>

            <div className="flex justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-sm font-semibold mr-2 min-w-max">
                  Incident Type:
                </span>{" "}
                {isEditing ? (
                  <div className="w-64">
                    <Dropdown
                      selectedFilter={selectedFilter}
                      setSelectedFilter={setSelectedFilter}
                    />
                  </div>
                ) : (
                  <>{selectedItem.type || "None"}</>
                )}
              </h2>
              {isEditing ? (
                <button
                  onClick={async () => {
                    await typeMutate(
                      { id: selectedItem.id, type: selectedFilter },
                      {
                        onSuccess: () => {
                          window.location.reload();
                        },
                      }
                    );
                    setIsEditing(false);
                  }}
                  className="text-sm px-4 py-2 rounded bg-blue-900 text-blue-100 flex gap-1"
                >
                  Save
                  <SaveIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm px-4 py-2 rounded text-blue-900 bg-blue-100 flex gap-1"
                >
                  Edit
                  <PencilAltIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <hr className="my-2" />
          <div className="flex mt-5">
            <h2 className="text-xl font-bold flex gap-2 items-center">
              Details:{" "}
            </h2>
          </div>

          <div className="flex gap-10 items-center">
            <h2 className="text-xl font-bold my-4">
              <span className="text-sm font-semibold mr-2">
                Cluster Precinct:
              </span>{" "}
              {selectedItem.pollplace_id || selectedItem.precinct_id}
            </h2>
          </div>

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

                    <div className="flex flex-wrap gap-2">
                      {images?.map((data: any, key: number) => (
                        <div
                          className="w-64 h-64 relative"
                          key={key}
                          onClick={() => {
                            setSelectedImage(data.image);
                            setIsOpen(true);
                          }}
                        >
                          <Image
                            src={`data:image/jpeg;base64,${data.image}`}
                            alt="Incident image"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold my-4 flex flex-col">
              <span className="text-sm font-semibold mr-2 pb-3">
                Resolution:
              </span>{" "}
              {selectedItem.resolution ? (
                <p>{selectedItem.resolution}</p>
              ) : (
                <span>
                  <textarea
                    name="resolution"
                    rows={5}
                    cols={60}
                    onChange={(e) => setResolution(e.target.value)}
                    className={`bg-neutral-100 p-2 rounded-md  focus:out text-sm ${
                      errorMsg && "border-2 border-scarlet-300"
                    }`}
                    onBlur={() => setErrorMsg(null)}
                  />
                  <span className="text-sm text-scarlet-300 font-normal ml-2">
                    {errorMsg}
                  </span>
                </span>
              )}
            </h2>
          </div>

          <div className="float-right flex gap-2 mt-5">
            {selectedItem.status === "Resolved" ? (
              <></>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 rounded text-sm text-white bg-blue-900"
                onClick={async () => {
                  if (resolution === "") {
                    setErrorMsg("Resolution field is required.");
                  } else {
                    await mutateAsync(
                      {
                        id: selectedItem.id,
                        newResolve:
                          selectedItem.status === "Resolved"
                            ? "Unresolved"
                            : "Resolved",
                        resolution: resolution,
                      },
                      {
                        onSuccess: () => {
                          // refresh window
                          window.location.reload();
                        },
                      }
                    );
                  }
                }}
              >
                Mark as Resolved
              </button>
            )}
          </div>
        </div>
      </AdminLayout>
      <ImagePopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Incident;
