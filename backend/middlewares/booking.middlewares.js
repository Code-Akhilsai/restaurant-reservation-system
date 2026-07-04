import jwt from "jsonwebtoken";

const bookingMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Please login first.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREATE_KEY);

    req.verified_user = decoded;

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    return res.status(401).json({
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};

export default bookingMiddleware;
