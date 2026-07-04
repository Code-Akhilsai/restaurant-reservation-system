import cancelBookingController from "../controllers/cancelBooking.controllers.js";
import bookingMiddleware from "../middlewares/booking.middlewares.js";
import { Router } from "express";

const Cancel_router = Router();
Cancel_router.patch(
  "/bookings/:bookingId/cancel",
  bookingMiddleware,
  cancelBookingController,
);

export default Cancel_router;
