import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      password: hashpassword,
    });

    const token = jwt.sign(
      {
        _id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role,
      },
      process.env.JWT_SECREATE_KEY,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      message: "Registration is successfull",
      token,
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }

    console.error("Error occurred during registration:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export default registerController;
