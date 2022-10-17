import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "db/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  try {
    const queryResult = await prisma.shortLink.findFirst({
      where: {
        slug: {
          equals: slug as string,
        },
      },
    });
    if (queryResult !== null) {
      res.status(200).json({ success: true, url: queryResult?.url });
    }
    res.end();
  } catch (error) {
    res.status(200).json({ success: false, message: "Unable to find url" });
  }
}
