import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShorUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "URL is required" });
  }
  const shortId = nanoid(8);
  await URL.create({
    shortId,
    redirectUrl: req.body.redirectUrl,
    visitedHistory: [],
  });
  return res.status(201).json({ id: shortId });
}

export { handleGenerateNewShorUrl };
