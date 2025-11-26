const express = require("express");
const router = express.Router();
const { 
  handleUserSignup, 
  handleUserLogin, 
  deleteAccount 
} = require("../controllers/user");

const { restrictTo } = require("../middlewares/auth");

// SIGNUP
router.post("/signup", handleUserSignup);

// LOGIN
router.post("/login", handleUserLogin);

// DELETE ACCOUNT
router.post("/delete", restrictTo(["NORMAL", "ADMIN"]), deleteAccount);

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/auth");   // <- correct redirect
});

module.exports = router;
