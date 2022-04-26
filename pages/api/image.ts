import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  const {
    method,
    query: { type, ref_id },
  } = req;

  if (method === "GET") {
    try {
      const images: any = await query({
        query: "SELECT * FROM `filestorages` WHERE image_type=? AND ref_id=?",
        values: [type, ref_id],
      });

      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
