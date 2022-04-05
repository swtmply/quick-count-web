import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

const Login = () => {
  const [values, setValues] = useState<{
    email: string;
    device_name: string;
    password: string;
  }>({
    email: "",
    device_name: "",
    password: "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post("/api/login", { ...values })
      .then((res) => console.log(res.data));
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    console.log(event.target.name);
  };

  // TODO: error message and validations
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
        <form
          onSubmit={onSubmit}
          className="max-w-max p-8 shadow-md rounded-md bg-white"
        >
          <h3 className="font-bold text-4xl pb-4">LOGIN</h3>

          <fieldset className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-neutral-500">
                Email
              </label>
              <input
                name="email"
                onChange={onChange}
                type="text"
                className="bg-neutral-100 p-2 rounded-md max-w-md focus:out"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-neutral-500">
                Password
              </label>
              <input
                name="password"
                onChange={onChange}
                type="password"
                className="bg-neutral-100 p-2 rounded-md max-w-md"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="bg-scarlet-300 hover:bg-scarlet-400 w-full max-w-md py-2 rounded-md text-white"
          >
            LOGIN
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
