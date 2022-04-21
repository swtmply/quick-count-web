import { ArrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getRegions } from "../../lib/queries";
import { Region } from "../national/";

const Local = () => {
  const { data, isLoading } = useQuery("regions", getRegions);

  return (
    <Layout>
      <div className="col-span-full my-8 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Local</h1>
      </div>

      <div className="col-span-full grid gap-2 grid-cols-12">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data.regions.map((region: Region) => (
            <div
              key={region.id}
              className="col-span-2 shadow-md p-4 rounded-md bg-white"
            >
              <Link href={`/local/${region.reg_id}`} passHref>
                <a className="flex space-x-2 cursor-pointer font-semibold text-lg">
                  <span>{region.reg_name}</span>
                </a>
              </Link>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Local;
