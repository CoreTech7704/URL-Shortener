const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleDeleteShortURL(req, res) {
  try {
    const { shortId } = req.params;

    await URL.deleteOne({
      shortId,
      createdBy: req.user._id, // ensures user can delete only their own
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).send("Something went wrong during deletion.");
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
};
