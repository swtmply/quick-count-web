import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  SelectorIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/Layout";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getIncidents,
  searchIncident,
  updateIncidentRead,
} from "../../lib/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PAGE_SIZE } from "../../lib/constants";
import Link from "next/link";

export const incidentType = [
  "All",
  "Peace & Order",
  "Logistics",
  "Operational",
  "System",
  "Others",
];

export interface Incident {
  id: number;
  ref_id: string;
  details: string;
  type: string;
  precinct_id: string;
  pollplace_id: string;
  watcher_id: string;
  status: string;
  isRead: number;
  pollplace: string;
  pollstreet: string;
  resolution: string | null;
  created_at: any;
}

const IncidentReport = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ["incidents", page],
    () => getIncidents(page),
    { keepPreviousData: true }
  );

  const { mutate } = useMutation(updateIncidentRead, {
    onSuccess: () => {
      queryClient.invalidateQueries("incidents");
    },
  });

  // filter by type
  const [selectedFilter, setSelectedFilter] = useState<string>(incidentType[0]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredIncidents(data.incidents);

      setPageLimit(Math.ceil(data.count.value / PAGE_SIZE));
    }
  }, [data]);

  // search
  const [searchFilter, setSearchFilter] = useState("");
  const { mutate: mutateSearch, data: searchData } =
    useMutation(searchIncident);

  useEffect(() => {
    if (searchFilter === "") {
      setFilteredIncidents(data?.incidents);
      setPageLimit(Math.ceil(data?.count.value / PAGE_SIZE));
    }
  }, [searchFilter, data?.incidents, data?.count]);

  useEffect(() => {
    if (searchData) {
      setFilteredIncidents(searchData.incidents);
      setPageLimit(Math.ceil(searchData.count.value / PAGE_SIZE));
    }
  }, [searchData]);

  // pages
  const [pageLimit, setPageLimit] = useState(0);

  return (
    <AdminLayout>
      <div className="col-span-full my-8 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Incident Report</h1>
      </div>

      {/* Filter List Component */}
      <div className="col-span-full grid grid-cols-12 mb-8">
        <div className="flex gap-4 col-span-4 items-center">
          <p className="min-w-max">Filter by:</p>
          <Dropdown
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        <form
          className="bg-white rounded-lg shadow-md flex items-center col-span-3 col-end-13"
          onSubmit={(e) => {
            e.preventDefault();

            mutateSearch(searchFilter);
          }}
        >
          <input
            className="text-gray-800 bg-transparent placeholder:text-gray-300 outline-none text-sm px-4 py-2 w-full "
            type="text"
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search reference ID"
          />
          <button
            type="submit"
            className="bg-indigo-1000 hover:bg-indigo-900 h-full rounded-tr-md rounded-br-md text-white px-2"
          >
            <SearchIcon className="w-6 h-6" />
          </button>
        </form>
      </div>

      {/* Table */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="col-span-full table-fixed">
          <thead className="text-left text-white bg-indigo-1000 text-sm font-semibold">
            <tr>
              <th className="pl-4 py-4">Reference No.</th>
              <th>Username</th>
              <th>Description</th>
              <th>Type</th>
              <th>Cluster Precinct</th>
              <th>Polling Site </th>
              <th>Date Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <motion.tbody className="bg-white">
            <>
              {filteredIncidents
                ?.filter((incident: Incident) => {
                  if (selectedFilter === "All") return incident;

                  if (selectedFilter === "Others") {
                    if (!incidentType.includes(incident.type)) return incident;
                  }

                  if (incident.type === selectedFilter) return incident;
                })
                .map((incident: Incident) => (
                  <Link
                    key={incident.id}
                    href={`/dashboard/${incident.id}`}
                    passHref
                  >
                    <motion.tr
                      layoutId={incident.id.toString()}
                      onClick={() => {
                        mutate(incident.id);
                      }}
                      className={`
                        ${
                          !incident.isRead
                            ? "font-bold cursor-pointer"
                            : "cursor-pointer"
                        } border-b border-gray-300
                          `}
                    >
                      <td className="py-4 pl-4 max-w-xs">{incident.ref_id}</td>
                      <td className="">{incident.watcher_id}</td>
                      <td className="truncate max-w-[6.5rem] pr-2">
                        {incident.details}
                      </td>
                      <td className="">{incident.type || "None"}</td>
                      <td className="">
                        {incident.pollplace_id || incident.precinct_id}
                      </td>
                      <td className="truncate max-w-[6rem] pr-2">
                        {incident.pollplace || "None"}
                      </td>
                      <td>
                        {new Date(incident.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "2-digit", day: "2-digit" }
                        )}
                      </td>
                      <td>{incident.status}</td>
                    </motion.tr>
                  </Link>
                ))}
            </>
          </motion.tbody>
        </table>
      )}

      <div className="col-span-full flex justify-end gap-3 items-center">
        <button
          className="p-1 rounded text-white bg-indigo-1000 hover:bg-indigo-900 disabled:bg-neutral-200 disabled:text-neutral-400"
          disabled={1 === page}
        >
          <ChevronLeftIcon
            className="w-6 h-6"
            onClick={() => setPage((prev) => (prev -= 1))}
          />
        </button>
        {page}
        <button
          className="p-1 rounded text-white bg-indigo-1000 hover:bg-indigo-900 disabled:bg-neutral-200 disabled:text-neutral-400"
          disabled={pageLimit === page}
        >
          <ChevronRightIcon
            className="w-6 h-6"
            onClick={() => setPage((prev) => (prev += 1))}
          />
        </button>
      </div>
    </AdminLayout>
  );
};

export default IncidentReport;

export const Dropdown = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Listbox
      as="div"
      className="w-full relative"
      value={selectedFilter}
      onChange={setSelectedFilter}
    >
      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
        <span className="block truncate">{selectedFilter}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>

      <Transition
        as={React.Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {incidentType.map((type: string) => (
            <Listbox.Option
              className={({ active }) =>
                `cursor-default select-none relative py-2 pl-3 pr-4 ${
                  active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                }`
              }
              key={type}
              value={type}
            >
              {type}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
