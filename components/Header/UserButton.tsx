import React from "react";
import {
  ExclamationIcon,
  LogoutIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import axios from "axios";

export const UserButton = () => {
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button>
        <UserCircleIcon className="w-12 h-12 text-white" />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={async () => {
                  if (router.pathname.includes("/dashboard")) {
                    return router.push("/");
                  }
                  router.push("/dashboard");
                }}
                className={`${
                  active ? "bg-blue-600 text-white" : "text-black"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                {router.pathname.includes("/dashboard") ? (
                  <StarIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                ) : (
                  <ExclamationIcon
                    className="w-6 h-6 mr-2"
                    aria-hidden="true"
                  />
                )}

                {router.pathname.includes("/dashboard")
                  ? "Vote Report"
                  : "Incident Report"}
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={async () => {
                  // TODO: remove user
                  await axios.post("/api/logout");

                  router.push("/login");
                }}
                className={`${
                  active ? "bg-blue-600 text-white" : "text-black"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                <LogoutIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
