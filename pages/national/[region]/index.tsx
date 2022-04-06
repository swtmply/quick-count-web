import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../../../components/Layout";
import { getProvinces } from "../../../lib/queries";

interface Province {
  id: string;
  province: string;
  ref: string;
}

const Region = () => {
  const router = useRouter();
  const reg_id: string = router.query.region as string;

  const { data, isLoading } = useQuery(["regions", reg_id], () =>
    getProvinces(reg_id)
  );

  if (isLoading) return <Layout>Loading....</Layout>;

  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">National</h1>

      <div className="col-span-full flex gap-2">
        {data &&
          data?.provinces.map((province: Province) => (
            <Link
              key={province.id}
              href={`/national/${reg_id}/${province.ref}`}
              passHref
            >
              <a>{province.province}</a>
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export default Region;
