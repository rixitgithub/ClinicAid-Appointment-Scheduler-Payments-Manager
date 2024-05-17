import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  console.log("getAllUsers endpoint hit"); // Log to indicate endpoint hit
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("createUser endpoint hit"); // Log to indicate endpoint hit
  console.log("Received data:", { email, password }); // Log the received data

  try {
    // Create a new user instance
    const user = new User({
      email: email,
      password: password,
    });

    // Save the new user to the database
    const newUser = await user.save();

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    // If there's an error, respond with an error message
    res.status(400).json({ message: error.message });
  }
};
