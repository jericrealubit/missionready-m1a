// import express from "express";

// const app = express();
// const PORT = process.env.PORT || 8080;
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("xxx");
// });

// app.listen(PORT, () =>
//   console.log(`Server running on port: http://localhost:${PORT}`)
// );

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 80;
const router = express.Router();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

router.get("/", (req, res) => {
  res.send("xxx");
});

app.use("/", router);
