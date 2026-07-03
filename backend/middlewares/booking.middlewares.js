import jwt from "jsonwebtoken";

const bookingMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ message: "unauthorized" });

    const decode = await jwt.verify(token, process.env.JWT_SECREATE_KEY);

    req.verified_user = decode;
    res.status(200).json({ message: "Authorized" });
    return next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "unauthorized" });
  }
};

export default bookingMiddleware;
