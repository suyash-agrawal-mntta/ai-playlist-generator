import { Router } from "express";
import { callback, login } from "../controllers/playlistController.js";

const router = Router();

// 🔐 Login route (Spotify OAuth)
router.get("/login", login);

// 🔁 Callback route
router.get("/callback", callback);

export default router;

