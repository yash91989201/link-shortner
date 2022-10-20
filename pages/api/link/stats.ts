import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "db/prisma-client";
import { LinkStats } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, fromDate, toDate } = req.body;
  try {
    const shortLink = await prisma.shortLink.findFirst({
      where: {
        slug: {
          equals: slug,
        },
      },
    });
    const queryResult = await prisma.linkStats.findMany({
      where: {
        shortLinkId: {
          equals: shortLink?.id,
        },
        created_at: {
          gte: fromDate,
          lte: toDate,
        },
      },
    });
    if (queryResult !== undefined) {
      return res.status(200).json({ success: true, data: queryResult });
    }
    throw new Error("Unable to fetch link stats");
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(400).json({ success: false, message: error.message });
  }
}
