import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (user) return res.send("User already existed");

    const hashpassword = await bcrypt.hash(password, 10);

    const response = await User.create({
      username,
      email,
      password: hashpassword,
    });

    console.log("User created successfully:", response);
    return res.status(200).json({ message: "Registration is successfull" });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export default registerController;
