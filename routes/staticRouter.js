const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

/* ---------------- PUBLIC ROUTES ---------------- */

// Auth page
router.get("/auth", (req, res) => {
  res.render("auth", { error: null, mode: "login", resetToken: null });
});

// Old redirects
router.get("/login", (req, res) => res.redirect("/auth"));
router.get("/signup", (req, res) => {
  return res.render("auth", { error: null, mode: "signup", resetToken: null });
});


/* ---------------- PROTECTED ROUTES ---------------- */

// ADMIN View: show all URLs
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});

  return res.render("home", {
    urls: allUrls,
    id: null,
    userName: req.user.email.split("@")[0],
  });
});

// NORMAL USER View
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

module.exports = router;
