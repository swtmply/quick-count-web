import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const user: any = await query({
        query: "SELECT * FROM `users` WHERE email=?",
        values: [req.body.email],
      });

      // TODO: check password if matched

      if (user.length === 0)
        res.status(401).json({ message: "User is not found" });

      res.json({ user });
    } catch (error) {
      console.log(error);
    }
  }
}
