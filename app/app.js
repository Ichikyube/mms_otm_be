require("dotenv").config();

const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const { graphqlHTTP } = require("express-graphql");
const parseServer = require("parse-server").ParseServer;
const cors = require("cors");

const schema = require("./graphql/schema");
const models = require("./models");
// In a node.js environment

const Parse = require("parse/node");
const FSFilesAdapter = require("@parse/fs-files-adapter");

const app = express();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing
  })
);

/*

var allowedOrigins = ["http://localhost:5500",

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

*/

// enable files upload

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "/public")));

const databaseUri =
  "postgres://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@" +
  process.env.DB_HOST +
  ":" +
  process.env.DB_PORT +
  "/" +
  process.env.DB_NAME +
  "?ssl=false";

const parseServerUrl =
  process.env.PARSE_SERVER_DOMAIN +
  //   ":" +

  //   process.env.PARSE_SERVER_PORT +

  "/parse";

var fsAdapter = new FSFilesAdapter({
  // filesSubDirectory: "my/files/folder", // optional, defaults to ./files
  // "encryptionKey": "someKey" //mandatory if you want to encrypt files
});

var api = new parseServer({
  databaseURI: databaseUri,

  //'mongodb://localhost:27017/dev', // Connection string for your MongoDB database

  cloud: __dirname + "/cloud/main.js", // Path to your Cloud Code

  appId: process.env.PARSE_APP_ID,

  masterKey: process.env.PARSE_MASTER_KEY, // Keep this key secret!

  restApiKey: process.env.PARSE_REST_KEY,

  javaScriptKey: process.env.PARSE_JSCRIPT_KEY,

  fileKey: process.env.PARSE_FILE_KEY,

  filesAdapter: fsAdapter,

  serverURL: parseServerUrl, // Don't forget to change to https if needed

  // Enable email verification

  verifyUserEmails: true,

  // The public URL of your app.

  // This will appear in the link that is used to verify email addresses and reset passwords,

  // Set the mount path as it is in serverURL

  publicServerURL: "https://backend.otm.armin.co.id/parse", //parseServerUrl,

  // Your apps name. This will appear in the subject and body of the emails that are sent.

  appName: process.env.PARSE_APP_NAME,

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
});

// Serve the Parse API on the /parse URL prefix

app.use("/parse", api);

// app.use(express.json());

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

const PORT = process.env.PARSE_SERVER_PORT || 4000;
app.listen(PORT, async () => {
  await models.sequelize.sync(); // Sync the models with the database
  console.log(
    "Parse-Server up n running on PORT: ",
    process.env.PARSE_SERVER_PORT
  );
});
