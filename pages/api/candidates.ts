import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { position },
  } = req;

  try {
    const candidates: any = await query({
      query: "SELECT * FROM `candidates` WHERE position_code=?",
      values: [position],
    });

    if (candidates.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.json({ candidates });
  } catch (error) {
    console.log(error);
  }
}
