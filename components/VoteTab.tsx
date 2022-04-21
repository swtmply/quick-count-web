import { Tab } from "@headlessui/react";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useContext } from "react";
import { SelectedPositionContext } from "../context/SelectedPosition";
import { TabProps } from "../types";

const VoteTab = ({ tabs }: { tabs: TabProps[] }) => {
  const { setSelectedPosition } = useContext(SelectedPositionContext);

  return (
    <Tab.Group>
      <div className="flex flex-col shadow-md col-span-full p-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <Tab.List className="font-bold flex gap-8 text-lg items-center relative">
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  classNames(
                    selected ? "font-bold" : "text-sm text-neutral-700",
                    selected && "border-b-4 border-blue-500"
                  )
                }
              >
                {tab.position}
              </Tab>
            ))}
          </Tab.List>
          <button
            className={classNames("bg-[#1774D1]", "p-2 mb-2 rounded-full")}
          >
            <ArrowsExpandIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        <hr className="mb-2" />
        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs uppercase font-bold text-neutral-400 mb-4">
                    <th className="text-center w-2 pr-2">Rank</th>
                    <th>Name</th>
                    <th className="text-right">Vote Percentage</th>
                    <th className="text-right">Votes</th>
                  </tr>
                </thead>

                {tab.content}
              </table>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default VoteTab;
