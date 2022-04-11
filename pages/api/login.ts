import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/db";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email } = await req.body;

  try {
    const user: any = await query({
      query: "SELECT * FROM `users` WHERE email=?",
      values: [email],
    });

    const isMatched = await bcrypt.compare(
      req.body.password,
      user[0].password.replace("$2y$", "$2a$")
    );

    if (!isMatched)
      res
        .status(400)
        .json({ message: "Invalid Credentials, Please try again." });

    if (user.length === 0)
      res.status(401).json({ message: "User is not found" });

    req.session.user = user;
    await req.session.save();

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
