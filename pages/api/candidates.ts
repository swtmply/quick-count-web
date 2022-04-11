import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { position, level },
  } = req;

  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  if (level)
    try {
      const candidates: any = await query({
        query: "SELECT * FROM `candidates` WHERE level_id=?",
        values: [level],
      });

      if (candidates.length === 0)
        res.status(401).json({ message: "Data not found" });

      res.status(200).json({ candidates });
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

      res.status(200).json({ candidates });
    } catch (error) {
      console.log(error);
    }

  try {
    const candidates: any = await query({
      query: "SELECT * FROM `candidates`",
    });

    if (candidates.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.status(200).json({ candidates });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
