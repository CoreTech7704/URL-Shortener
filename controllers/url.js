const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const userUrl = req.body.url;
  const userName = req.user.email.split("@")[0];
  
  const urls = await URL.find({ createdBy: req.user._id });

  //Validate input
  if (!userUrl || userUrl.trim() === "") {
    return res.render("home", {
      error: "URL is required!",
      urls,
      userName,
      id: null,
    });
  }

  //Parse URL
  let parsedUrl;
  try {
    parsedUrl = new URL(userUrl.trim());
  } catch {
    return res.render("home", {
      error: "Invalid URL format!",
      urls,
      userName,
      id: null,
    });
  }

  //Protocol whitelist
  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return res.render("home", {
      error: "Only HTTP/HTTPS URLs allowed!",
      urls,
      userName,
      id: null,
    });
  }

  const fullUrl = parsedUrl.toString();

  //Duplicate URL prevention
  const existing = await URL.findOne({
    redirectURL: fullUrl,
    createdBy: req.user._id,
  });

  if (existing) {
    return res.render("home", {
      id: existing.shortId,
      urls,
      userName,
    });
  }

  //Extra malicious defense
  const lowerUrl = fullUrl.toLowerCase();
  if (
    lowerUrl.startsWith("javascript:") ||
    lowerUrl.startsWith("data:") ||
    lowerUrl.includes("<script>")
  ) {
    return res.render("home", {
      error: "Malicious URL blocked!",
      urls,
      userName,
      id: null,
    });
  }

  // Generate short ID
  let shortID;
  do {
    shortID = nanoid(7);
  } while (await URL.exists({ shortId: shortID }));

  await URL.create({
    shortId: shortID,
    redirectURL: fullUrl,
    visitHistory: [],
    createdBy: req.user._id,
  });

  const updatedUrls = await URL.find({ createdBy: req.user._id });

  return res.render("home", {
    id: shortID,
    urls: updatedUrls,
    userName,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result?.visitHistory.length || 0,
    analytics: result?.visitHistory || [],
  });
}

async function handleDeleteShortURL(req, res) {
  try {
    const { shortId } = req.params;
    const userRole = req.user.role;

    // Admin can delete any URL
    if (userRole === "ADMIN") {
      await URL.deleteOne({ shortId });
      return res.redirect("/admin/urls");
    }

    // Normal user can delete only their own URLs
    await URL.deleteOne({
      shortId,
      createdBy: req.user._id,
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).send("Something went wrong while deleting the URL.");
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
};
