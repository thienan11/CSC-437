import express, { Request, Response } from "express";
import profiles from "./routes/profiles";
import studySpots from "./routes/study-spots";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import fs from "node:fs/promises";
import path from "path";

// MongoDB connection
connect("slostudyspots");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// JSON parsing middleware
app.use(express.json());

// Serve NPM packages
const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

// Auth routes
app.use("/auth", auth);

// Profile routes
app.use("/api/profiles", authenticateUser, profiles);

// Study Spot routes
app.use("/study-spots", studySpots);

// HTML Routes:
app.get("/hello", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});