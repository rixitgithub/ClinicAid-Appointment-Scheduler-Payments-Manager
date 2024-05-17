import express from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";

const router = express.Router();
console.log("Router setup"); // Log to indicate router setup

// Routes
router.post("/login", loginUser);
router.post("/", createUser);

export default router;
