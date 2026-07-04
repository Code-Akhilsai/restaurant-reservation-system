import { Router } from "express";
import bookingMiddleware from "../middlewares/booking.middlewares.js";
import bookingController from "../controllers/booking.controllers.js";

const Booking_router = Router();

Booking_router.post("/bookings", bookingMiddleware, bookingController);

export default Booking_router;
