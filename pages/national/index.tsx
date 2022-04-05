import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../../components/Layout";
import { getRegions } from "../../lib/queries";

interface Region {
  id: string;
  reg_name: string;
  reg_id: string;
}

export default function National() {
  const { data, isLoading } = useQuery("regions", getRegions);

  if (isLoading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">National</h1>

      <div className="col-span-full flex gap-2">
        {data &&
          data?.regions.map((region: Region) => (
            <Link key={region.id} href={`/national/${region.reg_id}`} passHref>
              <a>{region.reg_id}</a>
            </Link>
          ))}
      </div>

      {/* <VoteTab tabs={tabs} /> */}
    </Layout>
  );
}
