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
      await prisma.linkStats.create({
        data: {
          shortLinkId: queryResult.id,
        },
      });
      res.status(200).json({ success: true, url: queryResult?.url });
    }
    res.end();
  } catch (error) {
    res.status(200).json({ success: false, message: "Unable to find url" });
  }
}

const createDateString = () => {
  const d = new Date();
  const date = d.getDate();
  const month1 = month[d.getMonth()];
  const year = d.getFullYear();
  return `${date} ${month1} ${year}`;
};

const month = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEV",
];
