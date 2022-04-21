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
                <a className="font-semibold">{region.reg_name}</a>
              </Link>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Local;
