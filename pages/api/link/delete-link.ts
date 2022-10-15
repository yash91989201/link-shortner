import { NextApiRequest, NextApiResponse } from "next";
import prisma from "db/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  try {
    const queryResult = await prisma.shortLink.delete({
      where: {
        id,
      },
    });
    if (!!queryResult)
      return res
        .status(200)
        .json({ success: true, message: "Link deleted", data: queryResult });

    throw new Error("Unable to delete link");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      res.status(200).json({ success: false, message: error.message });
    }
  }
}
