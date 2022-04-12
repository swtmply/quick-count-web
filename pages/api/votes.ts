import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { region, province, municipality },
  } = req;

  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  if (region) {
    try {
      const result = await query({
        query: "SELECT * FROM `report_vote_per_region` WHERE region_code=?",
        values: [region],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  if (province) {
    try {
      const result = await query({
        query: "SELECT * FROM `report_vote_per_prov` WHERE prov_code=?",
        values: [province],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  if (municipality) {
    try {
      const result = await query({
        query: "SELECT * FROM `report_vote_per_mun` WHERE mun_code=?",
        values: [municipality],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  try {
    const result = await query({
      query: "SELECT * FROM `report_vote_per_candidate`",
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
