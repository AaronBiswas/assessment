import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "../server/DB/connectDB.js";
import adminRoutes from "./Routes/admin.route.js";
import agentRoutes from "../server/Routes/agent.route.js";
import uploadRoutes from "../server/Routes/upload.route.js";
import cors from "cors";
import { Auth } from "./Middleware/Auth.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();


app.use(cors({
  origin: "http://localhost:5173,https://assessment-2-i4ra.onrender.com",
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/agent",Auth, agentRoutes);
app.use("/file",uploadRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
