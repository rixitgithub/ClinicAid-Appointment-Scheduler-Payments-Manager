import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Adjust the path as needed

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;
export const createUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (user) {
    return res.status(403).json({ message: "Email already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  console.log("uuuuu");
  await newUser.save();
  console.log("success");
  res.json({ message: "User created successfully" });
};

export const loginUser = async (req, res) => {
  console.log(SECRET);
  console.log(req.body);
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
