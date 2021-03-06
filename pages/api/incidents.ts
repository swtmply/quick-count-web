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
    body: { id, newResolve, incident, resolution, newType },
    query: { read, resolve, page, type },
  } = req;

  if (method === "GET") {
    try {
      const incidents: any = await query({
        query:
          "SELECT `incidents`.id, `incidents`.ref_id, `incidents`.details, `incidents`.precinct_id, `incidents`.pollplace_id, `incidents`.watcher_id, `incidents`.status, `incidents`.isRead, `incidents`.type, `incidents`.resolution, `incidents`.`created_at`,`precincts`.pollplace, `precincts`.`pollstreet` FROM `incidents` LEFT JOIN `precincts` ON `incidents`.precinct_id=`precincts`.`precinct_id` ORDER BY `incidents`.`id` DESC LIMIT ?,?",
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
    if (type) {
      try {
        const incidents: any = await query({
          query: "UPDATE `incidents` SET type=? WHERE id=?",
          values: [newType, id],
        });

        res.status(200).json(incidents);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
    }

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
          query: "UPDATE `incidents` SET status=?, resolution=? WHERE id=?",
          values: [newResolve, resolution, id],
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
