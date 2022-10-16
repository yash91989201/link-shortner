import { NextApiRequest, NextApiResponse } from "next";
import prisma from "db/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, url, slug } = req.body;
  const containsHTTP = url.startsWith("https://");
  try {
    const slugExists = await prisma.shortLink.findFirst({
      where: {
        slug,
      },
    });
    if (slugExists == null) {
      const queryResult = await prisma.shortLink.create({
        data: {
          userId,
          url: containsHTTP ? url : `https://${url}`,
          slug,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Short link created",
        data: queryResult,
      });
    }
    res.status(400).json({
      success: false,
      message: "Short link already exists, choose a unique name",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Unable to add short link" });
  }
}
