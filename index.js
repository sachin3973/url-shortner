import express from "express";
import urlRoutes from "./routes/url.js";
const app = express();
import { connectToMongoDB } from "./connect.js";
const PORT = 8000;

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() => {
  console.log("Connected to MongoDB");
});

app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
