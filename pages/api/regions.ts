import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const regions: any = await query({
      query: "SELECT * FROM `refregion`",
    });

    if (regions.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.status(200).json({ regions });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
