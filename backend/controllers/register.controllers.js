import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const response = await User.create({
      username,
      email,
      password: hashpassword,
    });

    return res.status(201).json({ message: "Registration is successfull" });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export default registerController;
