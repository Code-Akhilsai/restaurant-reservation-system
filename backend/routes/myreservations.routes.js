import { Router } from "express";
import reservationsController from "../controllers/myreservations.controllers.js";
import bookingMiddleware from "../middlewares/booking.middlewares.js";

const Reservations_router = Router();

Reservations_router.get(
  "/myreservations",
  bookingMiddleware,
  reservationsController,
);

export default Reservations_router;
