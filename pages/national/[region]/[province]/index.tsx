import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../../../../components/Layout";
import { getMunicipalities } from "../../../../lib/queries";

interface Municipality {
  municipal: string;
}

const Province = () => {
  const router = useRouter();
  const prov_id: string = router.query.province as string;

  const { data, isLoading } = useQuery(["regions", prov_id], () =>
    getMunicipalities(prov_id)
  );

  if (isLoading) return <Layout>Loading....</Layout>;

  return (
    <Layout>
      <div className="col-span-full flex gap-2">
        {data &&
          data?.municipalities.map(
            (municipality: Municipality, idx: number) => (
              <p key={idx}>{municipality.municipal}</p>
            )
          )}
      </div>
    </Layout>
  );
};

export default Province;
