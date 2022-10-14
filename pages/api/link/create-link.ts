import { NextApiRequest, NextApiResponse } from "next";
import prisma from "db/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, url, slug } = req.body;
  try {
    const queryResult = await prisma.shortLink.create({
      data: {
        userId,
        url,
        slug,
      },
    });
    res.status(200).json({ success: true, data: queryResult });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ success: false, message: "Unable to add short link" });
  }
}
