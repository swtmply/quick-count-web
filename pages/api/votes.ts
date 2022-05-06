import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { region, province, municipality, position, top },
  } = req;

  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  if (region) {
    try {
      const result = await query({
        query:
          "SELECT * FROM `report_vote_per_region` WHERE region_code=? AND position_id=? AND client_id=? ORDER BY submitted_vote DESC",
        values: [region, position, req.session.user?.client_id],
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
          "SELECT * FROM `report_vote_per_muni` WHERE mun_code=? AND position_id=? AND prov_code=? AND client_id=? ORDER BY submitted_vote DESC",
        values: [municipality, position, province, req.session.user?.client_id],
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
          "SELECT * FROM `report_vote_per_prov` WHERE prov_code=? AND position_id=? AND client_id=? ORDER BY submitted_vote DESC",
        values: [province, position, req.session.user?.client_id],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  if (top) {
    try {
      const result = await query({
        query:
          "SELECT * FROM `report_vote_per_candidate` WHERE position_id='PR' AND client_id=? ORDER BY submitted_vote DESC LIMIT ?",
        values: [req.session.user?.client_id, Number(top)],
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  try {
    const result = await query({
      query:
        "SELECT * FROM `report_vote_per_candidate` WHERE position_id=? AND client_id=? ORDER BY submitted_vote DESC",
      values: [position, req.session.user?.client_id],
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
