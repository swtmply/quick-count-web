import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen font-poppins overflow-hidden">
      <section className="bg-indigo-1000 col-span-6 relative z-10">
        <div className="absolute -bottom-1">
          <Image
            src="/icons/sun-icon.svg"
            width={700}
            height={650}
            alt="Sun Icon"
          />
        </div>
        <div className="flex gap-2 items-center absolute left-40 top-24">
          <Image
            src="/icons/quick-count-logo.svg"
            width={150}
            height={150}
            alt="Quick Count Logo"
          />
          <div className="text-white">
            <h1 className="flex flex-col font-bold text-7xl mb-3">
              <span className="leading-none">QUICK</span>
              <span className="leading-none">COUNT</span>
            </h1>
            <p className="text-lg">Electoral Digital Counting System</p>
          </div>
        </div>
      </section>
      <section className="col-span-6 px-40 py-40">
        <form className="max-w-max p-8 shadow-md rounded-md">
          <h3 className="font-bold text-4xl pb-4">LOGIN</h3>

          <fieldset className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-neutral-500">
                Username
              </label>
              <input
                type="text"
                className="bg-neutral-100 p-2 rounded-md max-w-md focus:out"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-neutral-500">
                Password
              </label>
              <input
                type="password"
                className="bg-neutral-100 p-2 rounded-md max-w-md"
              />
            </div>
          </fieldset>

          <button className="bg-scarlet-300 hover:bg-scarlet-400 w-full max-w-md py-2 rounded-md text-white">
            LOGIN
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
