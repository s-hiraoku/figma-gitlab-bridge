import { prisma } from "@api/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS_CODES } from "@utils/http";
import { SETTING_KEY } from "@features/settings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { value } = req.body;
      await prisma.settings.update({
        where: { key: SETTING_KEY.figmaUrl },
        data: { value: value ?? "" },
      });
      res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
    } else {
      // Handle any other HTTP method
      res.setHeader("Allow", ["PUT"]);
      res
        .status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err); // Log error
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}
