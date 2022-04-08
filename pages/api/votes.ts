import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { region, province, municipality },
  } = req;

  if (region) {
    try {
      const result = await query({
        query: "SELECT * FROM `report_vote_per_region` WHERE region_code=?",
        values: [region],
      });

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  if (province) {
    try {
      const result = await query({
        query: "SELECT * FROM `report_vote_per_prov` WHERE prov_code=?",
        values: [province],
      });

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  if (municipality) {
    try {
      const result = await query({
        query: "SELECT * FROM `report_vote_per_mun` WHERE mun_code=?",
        values: [municipality],
      });

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const result = await query({
      query: "SELECT * FROM `report_vote_per_candidate`",
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
