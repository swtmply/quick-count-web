import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { reg_id },
  } = req;

  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  try {
    const provinces: any = await query({
      query: "SELECT * FROM `refprovince` WHERE reg_id=?",
      values: [reg_id],
    });

    if (provinces.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.status(200).json({ provinces });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
