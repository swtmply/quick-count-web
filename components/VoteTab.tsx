import { Tab } from "@headlessui/react";
import classNames from "classnames";
import React from "react";
import { TabProps } from "../types";

const VoteTab = ({ tabs }: { tabs: TabProps[] }) => {
  return (
    <Tab.Group>
      <div className="flex flex-col shadow-md col-span-full p-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <Tab.List className="font-bold flex gap-8 text-lg items-center relative">
            {tabs.map((tab, idx) => (
              <Tab
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                before={tab.position}
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
