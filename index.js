const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const URL = require("./models/url");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;

connectToMongoDB(
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/short-url"
).then(() => console.log("Mongodb connected"));

const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Max 20 URL creates per 15 mins
  message: "Too many requests! Try again later.",
});

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use(express.static("public"));

app.get("/url/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) {
    return res.status(404).render("404");
  }

  res.redirect(entry.redirectURL);
});

app.use(
  "/url",
  restrictTo(["NORMAL", "ADMIN"]),
  createUrlLimiter,
  urlRoute
);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
