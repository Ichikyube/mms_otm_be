import dotenv from "dotenv";
dotenv.config({ allowInterpolation: true });

import express from "express";
import { join } from "path";
import fileUpload from "express-fileupload";
import { graphqlHTTP } from "express-graphql";
import { ParseServer, ParseGraphQLServer } from "parse-server";
import ParseDashboard from "parse-dashboard";
import cors from "cors";

// import schema from './graphql/schema.js';
import models from "./models/index.js";
import logger from "./logger.js";
import __dirname from "./config/path.config.js";
import {
  PORT,
  mountPath,
  serverURL,
  parseServerUrl,
  parseConfig,
} from "./config/parse.config.js";
import dashboardConfig from "./config/dashboard.config.js";
const app = express();

const api = new ParseServer(parseConfig);

// GraphQL configuration
const parseGraphQLServer = new ParseGraphQLServer(api, {
  graphQLPath: "/graphql",
});

// Dashboard configuration
const dashboard = new ParseDashboard(dashboardConfig, {
  allowInsecureHTTP: true,
});

const allowedOrigins = [
  "http://localhost:5500",
  "http://localhost:1337",
  "http://127.0.0.1:5500",
  "http://localhost:5000",
  null,
];
await api.start();
parseGraphQLServer.applyGraphQL(app);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.options("*", cors());
// Serve the Parse API on the /parse URL prefix
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
  if (req.url.startsWith("/files/"))
    res.setHeader("Cache-Control", `max-age=${maxAge}`);
  next();
});

app.use("/public", express.static(join(__dirname, "/public")));
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true, // Enable GraphiQL for testing
//   })
// );
app.use("/dashboard", dashboard);

app.get("/", (req, res) => {
  res.json({
    status: true,

    message: "This is rest api working..",
  });
});

app.get("/test_fs", (req, res) => {
  Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JSCRIPT_KEY);

  Parse.serverURL = "https://umimarco.armin.co.id/parse";

  const textToConvert =
    "Test Parse Server File: " + new Date().toLocaleString();

  const base64 = Buffer.from(textToConvert).toString("base64");

  const parseFile = new Parse.File("myfile.txt", { base64: base64 });

  parseFile.save().then(
    function () {
      // The file has been saved to Parse.

      res.json({
        status: true,

        parseFile: parseFile,

        message: "This is fs parse working..",
      });
    },
    function (error) {
      // The file either could not be read, or could not be saved to Parse.

      res.json({
        status: false,

        message: error,
      });
    }
  );
});

app.post("/upload", (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,

        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file

      let filetoupload = req.files.filetoupload;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")

      //filetoupload.mv('./uploads/' + avatar.name);

      Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JSCRIPT_KEY);

      Parse.serverURL = "https://umimarco.armin.co.id/parse";

      const textToConvert =
        "Test Parse Server File: " + new Date().toLocaleString();

      const base64 = Buffer.from(filetoupload.data).toString("base64");

      const parseFile = new Parse.File(filetoupload.name, { base64: base64 });

      parseFile.save().then(
        function () {
          // The file has been saved to Parse.

          res.json({
            status: true,

            parseFile: parseFile,

            message: "This is fs parse working..",
          });
        },
        function (error) {
          // The file either could not be read, or could not be saved to Parse.

          res.json({
            status: false,

            message: error,
          });
        }
      );

      //send response

      /*res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: filetoupload.name,
                    mimetype: filetoupload.mimetype,
                    size: filetoupload.size
                }
            });*/
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, async () => {
  // await models.sequelize.sync(); // Sync the models with the database
  console.log(
    "Parse-Server up n running on PORT: ",
    process.env.PARSE_SERVER_PORT
  );
  // console.log(
  //   `Parse Dashboard running on http://${process.env.PARSE_SERVER_DOMAIN}:${process.env.PARSE_SERVER_PORT}/dashboard`
  // );
  // console.log(
  //   `GraphQL API running on http://${process.env.PARSE_SERVER_DOMAIN}:${process.env.PARSE_SERVER_PORT}/graphql`
  // );
  // console.log(
  //   `GraphQL Playground running on http://${process.env.PARSE_SERVER_DOMAIN}:${process.env.PARSE_SERVER_PORT}/playground`
  // );
});

// This will enable the Live Query real-time server
// await ParseServer.createLiveQueryServer(httpServer);
