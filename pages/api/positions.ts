import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const positions: any = await query({
      query: "SELECT * FROM `positions`",
    });

    if (positions.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.json({ positions });
  } catch (error) {
    console.log(error);
  }
}
