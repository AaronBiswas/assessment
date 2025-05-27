import agent from "../Models/agent.model.js";

export const login = async (req, res) => {
  const {email, password } = req.body;

  try {
    const existingUser = await agent.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    
    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Error checking existing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
