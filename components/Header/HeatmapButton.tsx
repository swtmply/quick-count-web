import React from "react";
import {
  ExclamationIcon,
  LogoutIcon,
  MapIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import axios from "axios";
import classNames from "classnames";
import { DEFAULT } from "./Nav";

export const HeatMapButton = () => {
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className={classNames(DEFAULT)}>Heatmap</Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-64 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={async () => {
                  router.push("/map/president");
                }}
                className={`${
                  active ? "bg-blue-600 text-white" : "text-black"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                <MapIcon className="w-6 h-6 mr-2" />
                Presidential
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={async () => {
                  router.push("/map/vicepresident");
                }}
                className={`${
                  active ? "bg-blue-600 text-white" : "text-black"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                <MapIcon className="w-6 h-6 mr-2" />
                Vice Presidential
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
