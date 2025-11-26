const express = require("express");
const router = express.Router();
const { 
  handleUserSignup,
    handleUserLogin,
    deleteAccount,
    forgotPassword,
    showResetPasswordPage,
    resetPassword
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

// FORGOT PASSWORD (POST)
router.post("/forgot-password", forgotPassword);

// RESET PAGE (GET)
router.get("/reset-password/:token", showResetPasswordPage);

// RESET ACTION (POST)
router.post("/reset-password/:token", resetPassword);

module.exports = router;
