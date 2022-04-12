import { Listbox, Transition } from "@headlessui/react";
import { SearchIcon, SelectorIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { AdminLayout } from "../../components/Layout";
import { motion } from "framer-motion";
import IncidentModal from "../../components/IncidentModal";

const incidentType = ["All", "Operational", "Logistical", "Others"];

const IncidentReport = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>(incidentType[0]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // TODO: filter by type
  // TODO: search

  return (
    <AdminLayout>
      <div className="col-span-full my-8 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Incident Report</h1>
      </div>

      {/* Filter List Component */}
      <div className="col-span-full grid grid-cols-12 mb-8">
        <div className="flex gap-4 col-span-4 items-center">
          <p className="min-w-max">Filter by:</p>
          <Listbox
            as="div"
            className="w-full relative"
            value={selectedFilter}
            onChange={setSelectedFilter}
          >
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selectedFilter}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
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
        </div>

        <div className="bg-white rounded-lg shadow-md flex items-center col-span-3 col-end-13">
          <input
            className="text-gray-800 bg-transparent placeholder:text-gray-300 outline-none text-sm px-4 py-2 w-full "
            type="text"
            // onChange={handleFilter}
            placeholder="Search reference ID"
          />
          <button className="bg-indigo-1000 hover:bg-indigo-900 h-full rounded-tr-md rounded-br-md text-white px-2">
            <SearchIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="col-span-full">
        <thead className="text-left text-white bg-indigo-1000 text-sm font-semibold">
          <tr>
            <th className="p-4">Incident No.</th>
            <th>Reference No.</th>
            <th>Username</th>
            <th>Title</th>
            <th>Type</th>
            <th>Cluster Precinct</th>
            <th>Polling Site</th>
            <th>Status</th>
          </tr>
        </thead>
        <motion.tbody className="bg-white">
          <motion.tr layoutId="1" onClick={() => setSelectedItem("1")}>
            <td className="p-4">1</td>
            <td>REF_0892031</td>
            <td>WCH_0101004</td>
            <td>My barilan d2</td>
            <td>Logistical</td>
            <td>01010015</td>
            <td>AGTANGAO ELEMENTARY SCHOOL</td>
            <td>Resolved</td>
          </motion.tr>
          <motion.tr layoutId="2" onClick={() => setSelectedItem("2")}>
            <td className="p-4">1</td>
            <td>REF_0892031</td>
            <td>WCH_0101004</td>
            <td>My barilan d2</td>
            <td>Logistical</td>
            <td>01010015</td>
            <td>AGTANGAO ELEMENTARY SCHOOL</td>
            <td>Resolved</td>
          </motion.tr>
          <motion.tr layoutId="3" onClick={() => setSelectedItem("3")}>
            <td className="p-4">1</td>
            <td>REF_0892031</td>
            <td>WCH_0101004</td>
            <td>My barilan d2</td>
            <td>Logistical</td>
            <td>01010015</td>
            <td>AGTANGAO ELEMENTARY SCHOOL</td>
            <td>Resolved</td>
          </motion.tr>
          <motion.tr
            className="font-bold"
            layoutId="4"
            onClick={() => setSelectedItem("4")}
          >
            <td className="p-4">1</td>
            <td>REF_0892031</td>
            <td>WCH_0101004</td>
            <td>My barilan d2</td>
            <td>Logistical</td>
            <td>01010015</td>
            <td>AGTANGAO ELEMENTARY SCHOOL</td>
            <td>Unresolved</td>
          </motion.tr>
          <motion.tr layoutId="5" onClick={() => setSelectedItem("5")}>
            <td className="p-4">1</td>
            <td>REF_0892031</td>
            <td>WCH_0101004</td>
            <td>My barilan d2</td>
            <td>Logistical</td>
            <td>01010015</td>
            <td>AGTANGAO ELEMENTARY SCHOOL</td>
            <td>Resolved</td>
          </motion.tr>
        </motion.tbody>
      </table>

      <IncidentModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </AdminLayout>
  );
};

export default IncidentReport;
