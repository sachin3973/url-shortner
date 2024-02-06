import express from "express";
import { handleGenerateNewShorUrl } from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShorUrl);

export default router;
