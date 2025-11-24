const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const userUrl = req.body.url;
  const userName = req.user.email.split("@")[0];

  // Pre-fetch URLs for re-render in case of errors
  const urls = await URL.find({ createdBy: req.user._id });

  // Validate required input
  if (!userUrl || userUrl.trim() === "") {
    return res.render("home", {
      error: "URL is required!",
      urls,
      userName,
      id: null,
    });
  }

  // Normalize URL + Auto-add https if missing
  let fullUrl = userUrl.trim();
  if (!/^https?:\/\//i.test(fullUrl)) {
    fullUrl = "https://" + fullUrl;
  }

  // Block malicious URLs only
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

  // Create short ID and save to DB
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: fullUrl,
    visitHistory: [],
    createdBy: req.user._id,
  });

  // Update url list after success
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
