import dotenv from "dotenv";
dotenv.config();
import { parseServerUrl } from "./parse.config.js";
const apps = [
  {
    appId: process.env.PARSE_APP_ID, // Don't forget to change to https if needed
    masterKey: process.env.PARSE_MASTER_KEY, // Keep this key secret!
    appName: process.env.PARSE_APP_NAME,
    serverURL: parseServerUrl,
  },
];

const dashboardConfig = {
  apps,
  iconsFolder: "icons",
  users: [
    {
      user: process.env.DASHBOARD_USERNAME,
      pass: process.env.DASHBOARD_PASSWORD,
    },
  ],
};

export default dashboardConfig;