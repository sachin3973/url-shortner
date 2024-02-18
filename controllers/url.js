import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShorUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortId = nanoid(8);
  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitedHistory: [],
  });
  return res.render("home", { id: shortId });
  return res.status(201).json({ id: shortId });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }
  return res.status(200).json({
    totalVisits: result.visitHistory.length,
    visitedHistory: result.visitHistory,
  });
}

export { handleGenerateNewShorUrl, handleAnalytics };
