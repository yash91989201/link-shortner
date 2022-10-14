import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "db/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;
  const queryResult = await prisma.shortLink.findMany({
    where: {
      userId,
    },
  });

  res.status(200).json({ success: true, links: queryResult });
}
