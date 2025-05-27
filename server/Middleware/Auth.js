import jwt from 'jsonwebtoken';
import Agent from '../Models/agent.model.js';


export const Auth=async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "No token provided, please log in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const agent = await Agent.findById(decoded.agentId).select("-password");
        if (!agent) {
            return res.status(401).json({ error: "Agent not found, please login again" });
        }

        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}