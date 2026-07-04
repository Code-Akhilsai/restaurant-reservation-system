import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../db/connectDB.js";
import Register_router from "../routes/register.routes.js";
import Login_router from "../routes/login.routes.js";
import Booking_router from "../routes/booking.routes.js";
import cookieParser from "cookie-parser";
import Reservations_router from "../routes/myreservations.routes.js";
import Cancel_router from "../routes/cancelBooking.routes.js";
import Admin_router from "../routes/admin.routes.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);
app.use(cookieParser());

await connectDB();

//routes
app.use("/api/auth", Register_router);
app.use("/api/auth", Login_router);
app.use("/api/auth", Booking_router);
app.use("/api/auth", Reservations_router);
app.use("/api/auth/", Cancel_router);
app.use("/api/auth", Admin_router);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
