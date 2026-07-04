import { Router } from "express";
import adminMiddleware from "../middlewares/admin.middlewares.js";
import adminBookingsController from "../controllers/admin.controllers.js";
import adminUpdateBookingController from "../controllers/adminUpdateBooking.controllers.js";
import adminCancelBookingController from "../controllers/adminCancelBooking.controllers.js";

const Admin_router = Router();

Admin_router.get("/admin/bookings", adminMiddleware, adminBookingsController);

Admin_router.patch(
  "/admin/bookings/:bookingId",
  adminMiddleware,
  adminUpdateBookingController,
);

Admin_router.patch(
  "/admin/bookings/:bookingId/cancel",
  adminMiddleware,
  adminCancelBookingController,
);

export default Admin_router;
