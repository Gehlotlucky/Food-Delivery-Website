import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();
// Routes
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});


