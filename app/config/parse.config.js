import dotenv from "dotenv";
dotenv.config();

import FSFilesAdapter from "@parse/fs-files-adapter";
import databaseURI from "./db.config.js";
export const PORT = process.env.PARSE_SERVER_PORT || 4000;

export const mountPath = process.env.PARSE_MOUNT || "/parse";
export const serverURL = `${process.env.PARSE_SERVER_DOMAIN}:${PORT}`;
export const parseServerUrl = serverURL + "/parse";

const fsAdapter = new FSFilesAdapter({
  filesSubDirectory: "my/files/folder", // optional, defaults to ./files
  encryptionKey: "someKey", //mandatory if you want to encrypt files
});

export const parseConfig = {
  databaseURI,
  // cloud: process.env.CLOUD_CODE_MAIN || dirname + "/cloud/main.js",
  appId: process.env.PARSE_APP_ID || "myAppId",
  masterKey: process.env.PARSE_MASTER_KEY || "", //Add your master key here. Keep it secret!
  restApiKey: process.env.PARSE_REST_KEY,
  javaScriptKey: process.env.PARSE_JSCRIPT_KEY,
  fileKey: process.env.PARSE_FILE_KEY,
  filesAdapter: fsAdapter,
  serverURL, // Don't forget to change to https if needed
  // The public URL of your app.
  // This will appear in the link that is used to verify email addresses and reset passwords,
  // Set the mount path as it is in serverURL
  publicServerURL: parseServerUrl, //parseServerUrl,
  // Your apps name. This will appear in the subject and body of the emails that are sent.
  appName: process.env.PARSE_APP_NAME,
  // Enable email verification
  verifyUserEmails: true,
  allowClientClassCreation: false,
  allowExpiredAuthDataToken: false,
  // Set email verification token validity to 2 hours
  emailVerifyTokenValidityDuration: 2 * 60 * 60,
  // The email adapter
  emailAdapter: {
    module: "parse-smtp-template",
    options: {
      port: 465,
      secure: true, // true for 465, false for other ports
      host: "mail.armin.co.id",
      user: "info@armin.co.id",
      password: "P@ssw0rd#1!",
      fromAddress: "info@armin.co.id",
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    },
  },
  liveQuery: {
    classNames: ["Posts", "Comments"], // List of classes to support for query subscriptions
  },
};
