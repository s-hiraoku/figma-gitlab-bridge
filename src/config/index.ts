import dotenv from "dotenv";

dotenv.config();
export const API_URL = process.env.FIGMA_GITLAB_BRIDGE_API_URL as string;
export const FIGMA_URL = process.env.FIGMA_URL as String;
