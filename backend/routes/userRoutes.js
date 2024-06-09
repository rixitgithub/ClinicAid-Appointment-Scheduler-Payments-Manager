import express from "express";
import {
  createUser,
  loginUser,
  checkLoginStatus,
} from "../controllers/userControllers.js";

const router = express.Router();
// Routes
router.post("/login", loginUser);
router.post("/", createUser);
router.get("/checkLoginStatus", checkLoginStatus);

export default router;
