import jwt from "jsonwebtoken";

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
};

const adminMiddleware = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Please login first.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREATE_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden. Admin access required.",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Admin middleware error:", error.message);

    return res.status(401).json({
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};

export default adminMiddleware;
