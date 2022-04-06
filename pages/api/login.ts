import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import bcrypt from "bcrypt";

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

      const isMatched = await bcrypt.compare(
        req.body.password,
        user[0].password.replace("$2y$", "$2a$")
      );

      if (user.length === 0)
        res.status(401).json({ message: "User is not found" });

      res.json({ user, isMatched });
    } catch (error) {
      console.log(error);
    }
  }
}
