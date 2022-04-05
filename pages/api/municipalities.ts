import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { prov_id },
  } = req;

  try {
    const municipalities: any = await query({
      query: "SELECT * FROM `muni_per_prov` WHERE prov_id=?",
      values: [prov_id],
    });

    if (municipalities.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.json({ municipalities });
  } catch (error) {
    console.log(error);
  }
}
