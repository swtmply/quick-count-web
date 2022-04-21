import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.session.user) {
      const {
        query: { region, province, municipality },
      } = req;

      if (region) {
        const result = await query({
          query: "SELECT * FROM `ballotperreg` WHERE region_code=?",
          values: [region],
        });

        return res.status(200).json(result);
      }

      if (province && municipality) {
        const result = await query({
          query:
            "SELECT * FROM `ballotpermun` WHERE prov_code=? AND mun_code=?",
          values: [province, municipality],
        });

        return res.status(200).json(result);
      }

      if (province) {
        const result = await query({
          query: "SELECT * FROM `ballotperprov` WHERE prov_code=?",
          values: [province],
        });

        return res.status(200).json(result);
      }

      const result = await query({
        query: "SELECT * FROM `TotalBallotCast`",
      });

      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
