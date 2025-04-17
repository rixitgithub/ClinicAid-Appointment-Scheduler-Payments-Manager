import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Clinic from "../models/Clinic.js";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(403).json({ message: "Email already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  console.log("New User:", newUser);
  await newUser.save();
  res.json({ message: "User created successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isPasswordValid = bcryptjs.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};

export const checkLoginStatus = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userId = decoded.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const clinics = await Clinic.find({ createdBy: userId });
      const isOwner = clinics.length > 0;

      res.json({ isLoggedIn: true, isOwner });
    });
  } catch (error) {
    console.error("Error checking login status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
