import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "db/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;
  try {
    const queryResult = await prisma.shortLink.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Fetched links successfully",
      data: queryResult,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "Unable to fetch links",
    });
  }
}
