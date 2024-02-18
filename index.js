import express from "express";
import urlRoutes from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import URL from "./models/url.js";
import path from "path";
const app = express();
import { connectToMongoDB } from "./connect.js";
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() => {
  console.log("Connected to MongoDB");
});

app.use("/url", urlRoutes);
app.use("/", staticRoute);

// To handle redirection
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: new Date(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
