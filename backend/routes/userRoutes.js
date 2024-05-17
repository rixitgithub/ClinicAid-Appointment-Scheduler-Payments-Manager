import express from "express";
import { getAllUsers, createUser } from "../controllers/userControllers.js";

const router = express.Router();
console.log("Router setup"); // Log to indicate router setup

// Routes
router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
