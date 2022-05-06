import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useUser } from "../../context/UserContext";
import { HeatMapButton } from "./HeatmapButton";

export const ACTIVE = "underline";
export const DEFAULT =
  "underline-offset-8 decoration-2 hover:cursor-pointer hover:underline";

export const Nav = () => {
  const router = useRouter();

  const { user } = useUser();

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/" passHref>
            <a
              className={classNames(DEFAULT, router.pathname === "/" && ACTIVE)}
            >
              Dashboard
            </a>
          </Link>
        </li>
        {user?.client_id === "005" ||
          (user?.client_id === "04" && (
            <li>
              <HeatMapButton />
            </li>
          ))}
        <li>
          <Link href="/national" passHref>
            <a
              className={classNames(
                DEFAULT,
                router.pathname === "/national" && ACTIVE
              )}
            >
              National
            </a>
          </Link>
        </li>
        <li>
          <Link href="/local" passHref>
            <a
              className={classNames(
                DEFAULT,
                router.pathname === "/local" && ACTIVE
              )}
            >
              Local
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const AdminNav = () => {
  const router = useRouter();

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/dashboard" passHref>
            <a
              className={classNames(
                DEFAULT,
                router.pathname === "/dashboard" && ACTIVE
              )}
            >
              Incident Report
            </a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/users" passHref>
            <a
              className={classNames(
                DEFAULT,
                router.pathname === "/dashboard/users" && ACTIVE
              )}
            >
              User Management
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
