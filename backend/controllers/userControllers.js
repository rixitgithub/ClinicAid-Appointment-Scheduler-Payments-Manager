import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Adjust the path as needed

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
