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
  console.log(`Server running on port: http://localhost:${PORT}/api`)
);

router.get("/", (req, res) => {
  res.json({ welcome: "/" });
});

router.get("/v1/carvalue", (req, res) => {
  const model = req.query.model;
  const year = req.query.year;

  if (year < 0) {
    res.json({ error: "Invalid year, should be positive number" });
  }
  if (isNaN(year)) {
    res.json({ error: "Invalid year, should be a number" });
  }

  const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;

  let model_val = 0;
  model.split("").map((letter) => {
    model_val += alphaVal(letter);
  });

  const car_value = !isNaN(model)
    ? Number(year)
    : model_val * 100 + Number(year);

  res.json({ car_value });
});

router.get("/v1/riskrating", (req, res) => {
  const claim_history = req.query.claim_history.toLowerCase();
  const keywords = ["collide", "crash", "scratch", "bump", "smash"];
  let risk_rating = 0;

  const word_count = claim_history.split(" ").length;
  if (word_count < 5) {
    res.json({ error: "Word count is low, should be at least 5 words" });
  }

  keywords.map((keyword) => {
    risk_rating += claim_history.split(keyword).length - 1;
  });

  if (risk_rating === 0) {
    res.json({
      error: `No keyword found, should have at least one of the following; "collide", "crash", "scratch", "bump", and "smash"`,
    });
  }

  res.json({ risk_rating });
});

router.get("/v1/quote", (req, res) => {
  const car_value = Number(req.query.car_value);
  const risk_rating = Number(req.query.risk_rating);

  if (isNaN(car_value) || isNaN(risk_rating)) {
    res.json({ error: "both arguments must be a number" });
  }
  if (car_value < 0 || risk_rating < 0) {
    res.json({ error: "both arguments must be a positive number" });
  }

  const yearly_premium = parseFloat((car_value * risk_rating) / 100).toFixed(1);
  const monthly_premium = parseFloat(yearly_premium / 12).toFixed(1);

  res.json({ monthly_premium, yearly_premium });
});

app.use("/api", router);
