import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../db/connectDB.js";
import Register_router from "../routes/register.routes.js";
import Login_router from "../routes/login.routes.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

await connectDB();

//routes
app.use("/api/auth", Register_router);
app.use("/api/auth", Login_router);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
