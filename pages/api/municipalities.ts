import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { prov_id },
  } = req;

  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  try {
    const municipalities: any = await query({
      query: "SELECT * FROM `muni_per_prov` WHERE prov_id=?",
      values: [prov_id],
    });

    if (municipalities.length === 0)
      res.status(401).json({ message: "Data not found" });

    res.status(200).json({ municipalities });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
