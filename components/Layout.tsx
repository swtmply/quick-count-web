import Image from "next/image";
import React from "react";
import { Nav } from "./Header/Nav";
import { UserButton } from "./Header/UserButton";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="font-poppins bg-neutral-100">
      <header className="flex items-center justify-between bg-indigo-1000 text-white p-4 px-8 fixed top-0 z-50 w-screen">
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
          <Nav />
          <UserButton />
        </section>
      </header>

      <main className="mt-[90px] min-h-screen max-w-7xl m-auto grid grid-cols-12 auto-rows-max gap-2 p-4">
        {children}
      </main>

      <footer>{/* Content */}</footer>
    </div>
  );
};
