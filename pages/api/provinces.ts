import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { reg_id },
  } = req;

  try {
    const provinces: any = await query({
      query: "SELECT * FROM `refprovince` WHERE reg_id=?",
      values: [reg_id],
    });

    if (provinces.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.json({ provinces });
  } catch (error) {
    console.log(error);
  }
}
