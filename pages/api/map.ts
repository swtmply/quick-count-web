import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  const {
    body: { region },
    query: { type, position },
  } = req;

  switch (type) {
    case "region":
      // per region
      try {
        const result = await query({
          query: `SELECT * FROM top_${position}_candidate_per_region WHERE client_id=?`,
          values: [req.session.user?.client_id],
        });

        return res.json(result);
      } catch (error) {
        console.log(error);
      }
    case "prov":
      try {
        const result = await query({
          query: `SELECT * FROM top_${position}_candidate_per_prov WHERE region_code=? AND client_id=?`,
          values: [region, req.session.user?.client_id],
        });

        return res.json(result);
      } catch (error) {
        console.log(error);
      }
    case "ncr":
      try {
        const result = await query({
          query: `SELECT * FROM top_${position}_candidate_per_mun WHERE region_code='NCR' AND prov_code != '39' AND client_id=?`,
          values: [req.session.user?.client_id],
        });

        const resultTwo = await query({
          query: `SELECT * FROM top_${position}_candidate_per_prov WHERE prov_code='39' AND client_id=?`,
          values: [req.session.user?.client_id],
        });

        return res.json([
          ...result,
          {
            candidate_id: resultTwo[0].candidate_id,
            candidate_name: resultTwo[0].candidate_name,
            mun_name: resultTwo[0].province_name,
            submitted_vote: resultTwo[0].submitted_vote,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
  }
}
