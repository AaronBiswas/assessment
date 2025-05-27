import Agent from "../Models/agent.model.js";

export const createAgent = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const newAgent = new Agent({
      name,
      email,
      password,
      mobile,
      role: "agent",
    });

    await newAgent.save();
    return res.status(201).json({ message: "Agent created successfully" });
  } catch (error) {
    console.error("Error checking existing agent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
