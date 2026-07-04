import { Booking } from "../models/booking.models.js";

const adminBookingsController = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "username email")
      .populate("table", "table_number table_capacity")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error("Admin bookings error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};

export default adminBookingsController;
