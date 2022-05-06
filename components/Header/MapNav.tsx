import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
export const ACTIVE = "underline";
export const DEFAULT =
  "underline-offset-8 decoration-2 hover:cursor-pointer hover:underline";

export const MapNav = () => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-indigo-1000 text-white p-4 px-8 z-10 w-screen">
      {/* Left side */}
      <section className="flex items-center gap-2">
        <Image
          src="/icons/quick-count-logo.svg"
          width={60}
          height={60}
          alt="Quick Count Logo"
        />
        <h1 className="flex flex-col font-bold text-2xl">
          <span className="leading-none">QUICK</span>
          <span className="leading-none">COUNT</span>
        </h1>
        {/* Brand image */}
      </section>

      {/* Right side */}
      <section className="flex items-center gap-4">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/" passHref>
                <a
                  className={classNames(
                    DEFAULT,
                    router.pathname === "/" && ACTIVE
                  )}
                >
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/map/president" passHref>
                <a
                  className={classNames(
                    DEFAULT,
                    router.pathname === "/map/president" && ACTIVE
                  )}
                >
                  President Heatmap
                </a>
              </Link>
            </li>
            <li>
              <Link href="/map/vicepresident" passHref>
                <a
                  className={classNames(
                    DEFAULT,
                    router.pathname === "/map/vicepresident" && ACTIVE
                  )}
                >
                  Vice President Heatmap
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};
