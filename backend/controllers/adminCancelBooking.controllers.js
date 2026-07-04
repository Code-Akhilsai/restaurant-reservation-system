import { Booking } from "../models/booking.models.js";

const adminCancelBookingController = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    await booking.populate("customer", "username email");
    await booking.populate("table", "table_number table_capacity");

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Admin cancel booking error:", error.message);

    return res.status(500).json({
      message: "Failed to cancel booking",
    });
  }
};

export default adminCancelBookingController;
