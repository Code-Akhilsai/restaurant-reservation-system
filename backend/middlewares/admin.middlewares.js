import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

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
    console.log("Admin middleware error:", error.message);

    return res.status(401).json({
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};

export default adminMiddleware;
