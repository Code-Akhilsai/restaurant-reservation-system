import { Booking } from "../models/booking.models.js";

const cancelBookingController = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { _id: userId } = req.verified_user;

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: userId,
      status: "confirmed",
    });

    if (!booking) {
      return res.status(404).json({
        message: "Confirmed booking not found",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error.message);

    return res.status(500).json({
      message: "Failed to cancel booking",
    });
  }
};

export default cancelBookingController;
