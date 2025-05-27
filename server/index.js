import express from "express";
import dotenv from "dotenv";
import connectDB from "../server/DB/connectDB.js";
import adminRoutes from "./Routes/admin.route.js";
import agentRoutes from "../server/Routes/agent.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


connectDB();

app.use("/admin", adminRoutes);
app.use("/agent", agentRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
