import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { level },
  } = req;

  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  if (level) {
    try {
      const positions: any = await query({
        query: "SELECT * FROM `positions` WHERE level_id=?",
        values: [level],
      });

      if (positions.length === 0)
        res.status(401).json({ message: "Data not found" });

      res.status(200).json({ positions });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  try {
    const positions: any = await query({
      query: "SELECT * FROM `positions` WHERE level_id=1",
    });

    if (positions.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.status(200).json({ positions });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
