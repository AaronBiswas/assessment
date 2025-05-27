import bcrypt from "bcryptjs";
import Admin from "../Models/admin.model.js";

const generateTokenandSetCookie = (adminId, res) => {
  try {
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });
    return token;
  } catch (error) {
    console.log("Error generating token", error);
    return res.status(500).json({
      success: false,
      message: "Error generating token",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateTokenandSetCookie(existingUser._id, res);
    
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error checking existing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    console.log("Admin created successfully:", newAdmin);
    return res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
