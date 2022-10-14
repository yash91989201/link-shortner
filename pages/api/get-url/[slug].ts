import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query["slug"];

  res.status(200).json({ url: "https://twitter.com" });
}
