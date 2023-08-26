import { zSettings } from "@lib/validators";
import { prisma } from "@api/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS_CODES } from "@utils/http";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";

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
      const figmaApiEndpoint = findValueInSettingsByKey(
        parsedData,
        SETTING_KEY.figmaApiEndpoint
      );
      const figmaToken = findValueInSettingsByKey(
        parsedData,
        SETTING_KEY.figmaAccessToken
      );
      const figmaUrl = findValueInSettingsByKey(
        parsedData,
        SETTING_KEY.figmaUrl
      );
      const gitLabApiEndpoint = findValueInSettingsByKey(
        parsedData,
        SETTING_KEY.gitLabApiEndpoint
      );
      const gitLabToken = findValueInSettingsByKey(
        parsedData,
        SETTING_KEY.gitLabAccessToken
      );
      await prisma.$transaction([
        prisma.settings.update({
          where: { key: SETTING_KEY.figmaApiEndpoint },
          data: { value: figmaApiEndpoint ?? "" },
        }),
        prisma.settings.update({
          where: { key: SETTING_KEY.figmaAccessToken },
          data: { value: figmaToken ?? "" },
        }),
        prisma.settings.update({
          where: { key: SETTING_KEY.figmaUrl },
          data: { value: figmaUrl ?? "" },
        }),
        prisma.settings.update({
          where: { key: SETTING_KEY.gitLabProjectPath },
          data: { value: gitLabToken ?? "" },
        }),
        prisma.settings.update({
          where: { key: SETTING_KEY.gitLabApiEndpoint },
          data: { value: gitLabApiEndpoint ?? "" },
        }),
        prisma.settings.update({
          where: { key: SETTING_KEY.gitLabAccessToken },
          data: { value: gitLabToken ?? "" },
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
