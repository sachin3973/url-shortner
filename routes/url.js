import express from "express";
import {
  handleGenerateNewShorUrl,
  handleAnalytics,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShorUrl);
router.get("/analytics/:shortId", handleAnalytics);

export default router;
