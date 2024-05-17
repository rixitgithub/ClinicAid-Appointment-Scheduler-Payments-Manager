import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log({ token });
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  const tokenValue = token.split(" ")[1]; // Extract the token value after removing the "Bearer " prefix
  console.log("hello");
  console.log({ tokenValue });
  console.log("this" + process.env.JWT_SECRET);
  jwt.verify(tokenValue, process.env.JWT_SECRET, (error, verified) => {
    if (error) {
      console.log("why");
      return res.status(400).json({ message: "Invalid token" });
    } else {
      req.user = verified;
      next();
    }
  });
};
