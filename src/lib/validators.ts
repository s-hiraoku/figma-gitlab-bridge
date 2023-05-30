import { z } from "zod";

export const zSetting = z.object({
  id: z.number(),
  key: z.string(),
  value: z.string(),
});

export const zSettings = z.array(zSetting);

export type Settings = z.infer<typeof zSettings>;
