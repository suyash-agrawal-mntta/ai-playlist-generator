import { Router } from "express";

const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Server is running");
});

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "API is working",
  });
});

export default router;

