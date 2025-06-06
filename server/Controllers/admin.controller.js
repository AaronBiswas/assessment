import bcrypt from "bcryptjs";
import Admin from "../Models/admin.model.js";
import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
  });
};

export const verify = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("No Token")
      return res
        .status(401)
        .json({ error: "No token provided, please log in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId).select("-password");
    if (!admin) {
      return res
        .status(401)
        .json({ error: "Agent not found, please login again" });
    }
    return res.status(200).json({ user: admin });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateTokenandSetCookie(existingUser._id, res);

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error checking existing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging out!" });
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

    generateTokenandSetCookie(newAdmin._id, res);

    console.log("Admin created successfully:", newAdmin);
    return res
      .status(201)
      .json({ message: "Admin created and logged in successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
