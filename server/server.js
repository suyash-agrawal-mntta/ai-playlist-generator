import express from "express";
import cors from "cors";
import "./config/env.js";
import indexRoutes from "./routes/indexRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRoutes);
app.use("/", authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on http://127.0.0.1:3000");
});
