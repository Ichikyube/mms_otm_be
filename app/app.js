import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import fileUpload from 'express-fileupload';
import { graphqlHTTP } from 'express-graphql';
import ParseServer, { ParseGraphQLServer } from 'parse-server';
import cors from 'cors';
// import Parse from 'parse/node';
import FSFilesAdapter from '@parse/fs-files-adapter';
import schema from './graphql/schema.js';
import models from './models/index.js';
import cloud from './cloud.js';
import logger from './logger.js';

const app = express();

const parseServerUrl =
  process.env.PARSE_SERVER_DOMAIN +
  //   ":" +
  //   process.env.PARSE_SERVER_PORT +
  "/parse";

const fsAdapter = new FSFilesAdapter({
  // filesSubDirectory: "my/files/folder", // optional, defaults to ./files
  // "encryptionKey": "someKey" //mandatory if you want to encrypt files
});

export const parseConfig = {
  databaseURI:
    process.env.DATABASE_URI,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + "/cloud/main.js",
  appId: process.env.PARSE_APP_ID || "myAppId",
  masterKey: process.env.PARSE_MASTER_KEY || "", //Add your master key here. Keep it secret!
  restApiKey: process.env.PARSE_REST_KEY,
  javaScriptKey: process.env.PARSE_JSCRIPT_KEY,
  fileKey: process.env.PARSE_FILE_KEY,
  filesAdapter: fsAdapter,
  serverURL: parseServerUrl, // Don't forget to change to https if needed
  // The public URL of your app.
  // This will appear in the link that is used to verify email addresses and reset passwords,
  // Set the mount path as it is in serverURL
  publicServerURL: "https://backend.otm.armin.co.id/parse", //parseServerUrl,
  // Your apps name. This will appear in the subject and body of the emails that are sent.
  appName: process.env.PARSE_APP_NAME,
  // Enable email verification
  verifyUserEmails: true,
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

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || "/parse";
const api = new ParseServer(parseConfig);
const apps = [{
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.APP_MASTER_KEY,
  appName: process.env.PARSE_APP_NAME,
  serverURL: process.env.PARSE_SERVER_DOMAIN,
}]
// GraphQL configuration
const parseGraphQLServer = new ParseGraphQLServer(api, {
  graphQLPath: '/graphql',
});

parseGraphQLServer.applyGraphQL(app);

// Dashboard configuration
const dashboard = new ParseDashboard(
  {
      apps: apps,
      iconsFolder: 'icons',
      users: [{ user: process.env.DASHBOARD_USERNAME, pass: process.env.DASHBOARD_PASSWORD }],
  },
  {
      allowInsecureHTTP: true,
  },
);

const allowedOrigins = ["http://localhost:5500",
                        "http://127.0.0.1:5500",
                        "http://apps.biznids.com:4040",
                        "https://www.awanpintar.com", null];
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if(!origin) return callback(null,true);
        if(allowedOrigins.indexOf(origin) === -1)
        {
            var msg= "The CORS policy for this site does not " + "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.options("*", cors());
app.use(express.json());
await api.start();
app.use(mountPath, api.app);

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Set the Cache-Control header for files
app.use((req, res, next) => {
  const maxAge = process.env.CACHE_MAX_AGE || 2_592_000;
  if (req.url.startsWith('/files/')) res.setHeader('Cache-Control', `max-age=${maxAge}`);
  next();
});

app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing
  })
);
app.use('/dashboard', dashboard);

app.get("/", (req, res) => {
  res.json({
    status: true,

    message: "This is rest api working..",
  });
});

// app.get("/test_fs", (req, res) => {
//   Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JSCRIPT_KEY);

//   Parse.serverURL = "https://umimarco.armin.co.id/parse";

//   const textToConvert =
//     "Test Parse Server File: " + new Date().toLocaleString();

//   const base64 = Buffer.from(textToConvert).toString("base64");

//   const parseFile = new Parse.File("myfile.txt", { base64: base64 });

//   parseFile.save().then(
//     function () {
//       // The file has been saved to Parse.

//       res.json({
//         status: true,

//         parseFile: parseFile,

//         message: "This is fs parse working..",
//       });
//     },
//     function (error) {
//       // The file either could not be read, or could not be saved to Parse.

//       res.json({
//         status: false,

//         message: error,
//       });
//     }
//   );
// });

// app.post("/upload", (req, res) => {
//   try {
//     if (!req.files) {
//       res.send({
//         status: false,

//         message: "No file uploaded",
//       });
//     } else {
//       //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file

//       let filetoupload = req.files.filetoupload;

//       //Use the mv() method to place the file in upload directory (i.e. "uploads")

//       //filetoupload.mv('./uploads/' + avatar.name);

//       Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JSCRIPT_KEY);

//       Parse.serverURL = "https://umimarco.armin.co.id/parse";

//       const textToConvert =
//         "Test Parse Server File: " + new Date().toLocaleString();

//       const base64 = Buffer.from(filetoupload.data).toString("base64");

//       const parseFile = new Parse.File(filetoupload.name, { base64: base64 });

//       parseFile.save().then(
//         function () {
//           // The file has been saved to Parse.

//           res.json({
//             status: true,

//             parseFile: parseFile,

//             message: "This is fs parse working..",
//           });
//         },
//         function (error) {
//           // The file either could not be read, or could not be saved to Parse.

//           res.json({
//             status: false,

//             message: error,
//           });
//         }
//       );

//       //send response

//       /*res.send({
//                 status: true,
//                 message: 'File is uploaded',
//                 data: {
//                     name: filetoupload.name,
//                     mimetype: filetoupload.mimetype,
//                     size: filetoupload.size
//                 }
//             });*/
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

const PORT = process.env.PARSE_SERVER_PORT || 4000;
app.listen(PORT, async () => {
  await models.sequelize.sync(); // Sync the models with the database
  console.log(
    "Parse-Server up n running on PORT: ",
    process.env.PARSE_SERVER_PORT
  );
  console.log(`Parse Dashboard running on http://${process.env.PARSE_SERVER_DOMAIN}:${process.env.PARSE_SERVER_PORT}/dashboard`)
  console.log(`GraphQL API running on http://${process.env.PARSE_SERVER_DOMAIN}:${process.env.PARSE_SERVER_PORT}/graphql`);
  console.log(`GraphQL Playground running on http://${process.env.PARSE_SERVER_DOMAIN}:${process.env.PARSE_SERVER_PORT}/playground`);
});
app.listen(1337, function() {
  console.log('REST API running on http://localhost:1337/parse');
});
// This will enable the Live Query real-time server
await ParseServer.createLiveQueryServer(httpServer);