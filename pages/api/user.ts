import { withIronSessionApiRoute } from "iron-session/next/dist";
import { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.session.user) {
      const id = req.session.user.id;

      const result = await query({
        query: "SELECT * FROM `user WHERE id=?`",
        values: [id],
      });

      res.status(200).json({ result });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
