import jwt from "jsonwebtoken";
import Admin from "../Models/admin.model.js";

export const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
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

    req.user=admin;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
