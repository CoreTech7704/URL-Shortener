const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  console.log("Admin URL Count:", allUrls.length);
  console.log(allUrls);
  return res.render("home", { urls: allUrls });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // Step 1: Check if the logged-in user is admin
  if (req.user.role === "ADMIN") {
    return res.redirect("/admin/urls");
  }

  // Step 2: Normal user logic
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allurls });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
