const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

app.use(cors());

// needed for adding a document
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send({ UserList });
});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
