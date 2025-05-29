import path from "path";
import fs from "fs";
import Agent from "../Models/agent.model.js";

const uploadDir = path.resolve("uploads");

export const Upload = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const filePath = path.join(uploadDir, req.file.filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const lines = fileContent.trim().split("\n");
    const headers = lines[0].split(",");

    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header.trim()] = values[idx].trim();
      });
      return obj;
    });

    const agents = await Agent.find({});

    for (const agent of agents) {
      agent.tasks = [];
    }

    const totalItems = data.length;
    const baseCount = Math.floor(totalItems / agents.length);
    const remainder = totalItems % agents.length;

    let index = 0;
    for (let i = 0; i < agents.length; i++) {
      const count = baseCount + (i < remainder ? 1 : 0);
      agents[i].tasks = data.slice(index, index + count).map(item =>
        Object.values(item).join(",")
      );
      index += count;
    }

    await Promise.all(agents.map((agent) => agent.save()));

    res.status(200).json({ success: true, filename: req.file.filename, distributedCount: totalItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
