import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { region, province, municipality, position },
  } = req;

  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  if (region) {
    try {
      const result = await query({
        query:
          "SELECT * FROM `report_vote_per_region` WHERE region_code=? AND position_id=? ORDER BY submitted_vote DESC",
        values: [region, position],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  if (province) {
    try {
      const result = await query({
        query:
          "SELECT * FROM `report_vote_per_prov` WHERE prov_code=? AND position_id=? ORDER BY submitted_vote DESC",
        values: [province, position],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  if (municipality) {
    try {
      const result = await query({
        query:
          "SELECT * FROM `report_vote_per_mun` WHERE mun_code=? AND position_id=? ORDER BY submitted_vote DESC",
        values: [municipality, position],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  try {
    const result = await query({
      query:
        "SELECT * FROM `report_vote_per_candidate` WHERE position_id=? ORDER BY submitted_vote DESC",
      values: [position],
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
