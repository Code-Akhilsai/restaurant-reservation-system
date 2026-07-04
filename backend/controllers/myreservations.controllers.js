import { Booking } from "../models/booking.models.js";

const reservationsController = async (req, res) => {
  try {
    const { _id: userId } = req.verified_user;

    const bookings = await Booking.find({
      customer: userId,
    })
      .populate("table", "table_number table_capacity")
      .sort({ reservationDate: 1, timeSlot: 1 });

    return res.status(200).json({
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error("Get reservations error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch reservations",
    });
  }
};

export default reservationsController;
