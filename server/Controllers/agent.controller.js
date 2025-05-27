import Agent from "../Models/agent.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (agentId, res) => {
  try {
    const token = jwt.sign({ agentId }, process.env.JWT_SECRET, {
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

export const createAgent = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const newAgent = new Agent({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await newAgent.save();

    generateTokenandSetCookie(newAgent._id, res);

    
    console.log("Agent created successfully:", newAgent);
    return res.status(201).json({ message: "Agent created successfully" });
  } catch (error) {
    console.error("Error checking existing agent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, agent.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateTokenandSetCookie(agent._id, res);

    return res
      .status(200)
      .json({ message: "Login successful", success: true, token });
  } catch (error) {
    console.error("Error finding agent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
