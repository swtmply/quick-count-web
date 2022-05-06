import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
