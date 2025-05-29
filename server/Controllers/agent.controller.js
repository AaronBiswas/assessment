import bcrypt from "bcryptjs";
import Agent from "../Models/agent.model.js";


export const createAgent = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword=await bcrypt.hash(password,10)

    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const newAgent = new Agent({
      admin:req.user._id,
      name,
      email,
      password:hashedPassword,
      mobile,
    });

    await newAgent.save();
    return res.status(201).json({ message: "Agent created successfully" });
  } catch (error) {
    console.error("Error checking existing agent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

