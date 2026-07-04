import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res.status(401).json({ message: "Invalid credentionals" });

    //Token

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECREATE_KEY,
      {
        expiresIn: "1d",
      },
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successfull",
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

export default loginController;
