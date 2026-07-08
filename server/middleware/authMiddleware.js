
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};