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
            <Tab.Panel
              key={idx}
              className={({ selected }) =>
                classNames(
                  selected ? "font-bold" : "text-sm text-neutral-700",
                  "before:absolute before:block before:max-w-max before:h-2 before:bg-blue-500"
                )
              }
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default VoteTab;
