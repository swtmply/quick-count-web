import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { position, level },
  } = req;

  if (level)
    try {
      const candidates: any = await query({
        query: "SELECT * FROM `candidates` WHERE level_id=?",
        values: [level],
      });

      if (candidates.length === 0)
        res.status(401).json({ message: "Data not found" });

      res.json({ candidates });
    } catch (error) {
      console.log(error);
    }

  if (position)
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

  try {
    const candidates: any = await query({
      query: "SELECT * FROM `candidates`",
    });

    if (candidates.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.json({ candidates });
  } catch (error) {
    console.log(error);
  }
}
