const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const URL = require("../models/url");
const { setUser } = require("../service/auth");
const bcrypt = require("bcryptjs");

async function handleUserSignup(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return res.render("auth", {
      error: { type: "signup", message: "All fields are required!" },
      mode: "signup",
    });
  }

  if (password !== confirmPassword) {
    return res.render("auth", {
      error: { type: "signup", message: "Passwords do not match!" },
      mode: "signup",
    });
  }

  // Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render("auth", {
      error: { type: "signup", message: "Email already registered!" },
      mode: "signup",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Issue JWT
  const token = setUser(newUser);
  res.cookie("token", token);

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("auth", {
      error: { type: "login", message: "Invalid email or password" },
      mode: "login",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("auth", {
      error: { type: "login", message: "Invalid email or password" },
      mode: "login",
    });
  }

  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

async function deleteAccount(req, res) {
  try {
    const userId = req.user._id;

    if (req.user.role === "ADMIN") {
      return res.status(403).send("Admin accounts cannot be deleted.");
    }

    await URL.deleteMany({ createdBy: userId });
    await User.deleteOne({ _id: userId });

    res.clearCookie("token");
    return res.redirect("/auth");
  } catch (err) {
    console.error("Error deleting account:", err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  deleteAccount,
};
