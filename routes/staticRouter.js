const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

// ADMIN View: show all URLs
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});

  return res.render("home", {
    urls: allUrls,
    id: null,
    userName: req.user.email.split("@")[0], // 👈 Always pass userName
  });
});

// NORMAL USER View: show only user URLs
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  if (req.user.role === "ADMIN") {
    return res.redirect("/admin/urls");
  }

  const allUrls = await URL.find({ createdBy: req.user._id });

  return res.render("home", {
    urls: allUrls,
    id: null,
    userName: req.user.email.split("@")[0], 
  });
});

// Auth pages
router.get("/auth", (req, res) => {
  return res.render("auth", { error: null, mode: "login" });
});

router.get("/login", (req, res) => {
  return res.redirect("/auth");
});

router.get("/signup", (req, res) => {
  return res.redirect("/auth");
});


module.exports = router;
