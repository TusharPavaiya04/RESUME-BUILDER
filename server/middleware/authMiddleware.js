import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization; // ✅ use let

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // ✅ works now
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};