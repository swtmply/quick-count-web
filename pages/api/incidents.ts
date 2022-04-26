import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { PAGE_SIZE } from "../../lib/constants";
import query from "../../lib/db";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) res.status(401).json({ message: "Not authorized" });

  const {
    method,
    body: { id, newResolve, incident },
    query: { read, resolve, page },
  } = req;

  if (method === "GET") {
    try {
      const incidents: any = await query({
        query:
          "SELECT `incidents`.id, `incidents`.ref_id, `incidents`.details, `incidents`.precinct_id, `incidents`.pollplace_id, `incidents`.watcher_id, `incidents`.status, `incidents`.isRead, `incidents`.type, `precincts`.pollplace, `precincts`.`pollstreet` FROM `incidents` LEFT JOIN `precincts` ON `incidents`.precinct_id=`precincts`.`precinct_id` LIMIT ?,?",
        values: [PAGE_SIZE * (Number(page) - 1), PAGE_SIZE],
      });

      const incidentsCount: any = await query({
        query: "SELECT COUNT(*) as value FROM `incidents`",
      });

      res.status(200).json({ incidents, count: incidentsCount[0] });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  if (method === "POST") {
    if (read) {
      try {
        const incidents: any = await query({
          query: "UPDATE `incidents` SET isRead = 1 WHERE id=?",
          values: [id],
        });

        res.status(200).json(incidents);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
    }

    if (resolve) {
      try {
        const incidents: any = await query({
          query: "UPDATE `incidents` SET status=? WHERE id=?",
          values: [newResolve, id],
        });

        res.status(200).json(incidents);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
    }

    if (incident) {
      const filter = `%${incident}%`;

      try {
        const incidents: any = await query({
          query: "SELECT * FROM `incidents` WHERE ref_id LIKE ?",
          values: [filter],
        });

        const incidentsCount: any = await query({
          query:
            "SELECT COUNT(*) as value FROM `incidents` WHERE ref_id LIKE ?",
          values: [filter],
        });

        res.status(200).json({ incidents, count: incidentsCount[0] });
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
    }
  }
}
