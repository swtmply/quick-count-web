import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.session.user) {
      const result = await query({
        query:
          "select sum(`qkapi_db`.`votes`.`total_ballot_count`) AS `total_ballot_cast` from `qkapi_db`.`votes`",
      });

      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
