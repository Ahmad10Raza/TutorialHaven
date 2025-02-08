import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const Port = process.env.PORT || 5000;

connectDB(); // Database connection

const __dirname = path.resolve();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));

// API routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/category", categoryRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend", "build")));

// Handle all other routes by serving the frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(Port, () => {
  console.log(`App running on http://localhost:${Port}`);
});
