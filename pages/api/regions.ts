import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const regions: any = await query({
      query: "SELECT * FROM `refregion`",
    });

    if (regions.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.json({ regions });
  } catch (error) {
    console.log(error);
  }
}
