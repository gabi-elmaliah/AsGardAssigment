import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});