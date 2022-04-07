import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await query({
      query: "SELECT * FROM `report_vote_per_candidate`",
    });

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
}
