import { Router } from "express";
import adminMiddleware from "../middlewares/admin.middlewares.js";
import adminBookingsController from "../controllers/admin.controllers.js";

const Admin_router = Router();

Admin_router.get("/admin/bookings", adminMiddleware, adminBookingsController);

export default Admin_router;
