import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { level },
  } = req;

  if (level) {
    try {
      const positions: any = await query({
        query: "SELECT * FROM `positions` WHERE level_id=?",
        values: [level],
      });

      if (positions.length === 0)
        res.status(401).json({ message: "Data not found" });

      res.json({ positions });
    } catch (error) {
      console.log(error);
    }
  }

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
