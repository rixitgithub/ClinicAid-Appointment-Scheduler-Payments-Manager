import express from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";

const router = express.Router();
// Routes
router.post("/login", loginUser);
router.post("/", createUser);

export default router;
