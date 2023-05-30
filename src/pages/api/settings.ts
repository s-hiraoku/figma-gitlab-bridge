import { zSettings } from "@lib/validators";
import { prisma } from "@api/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS_CODES } from "@utils/httpStatusCodes";
import { SETTING_KEY, findValueInSettingsByKey } from "@pages/settings/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const settings = await prisma.settings.findMany();

      res.status(HTTP_STATUS_CODES.OK).json(settings);
    } else if (req.method === "PUT") {
      const data = JSON.parse(req.body);
      const parsedData = zSettings.parse(data);
      const figmaAPIEndpoint = findValueInSettingsByKey(
        parsedData,
        SETTING_KEY.figmaAPIEndpoint
      );
      const figmaToken = findValueInSettingsByKey(
        parsedData,
        SETTING_KEY.figmaAccessToken
      );
      await prisma.$transaction([
        prisma.settings.update({
          where: { key: SETTING_KEY.figmaAPIEndpoint },
          data: { value: figmaAPIEndpoint ?? "" },
        }),
        prisma.settings.update({
          where: { key: SETTING_KEY.figmaAccessToken },
          data: { value: figmaToken ?? "" },
        }),
      ]);
      res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
    } else {
      // Handle any other HTTP method
      res.setHeader("Allow", ["GET", "PUT"]);
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
