import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query["slug"];
  if (!slug) res.status(404).json({ message: "slug not provided" });
  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug as string,
      },
    },
  });

  if (!data) {
    return res.status(404).json({ message: "slug not found" });
  }
  res.status(200).json({ url: data.url });
}
