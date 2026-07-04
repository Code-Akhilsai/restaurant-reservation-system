import { Booking } from "../models/booking.models.js";
import { Table } from "../models/table.models.js";

const adminUpdateBookingController = async (req, res) => {
  const { bookingId } = req.params;
  const { reservationDate, timeSlot, members, notes } = req.body;

  try {
    if (!reservationDate || !timeSlot || !members) {
      return res.status(400).json({
        message: "Date, time slot, and members are required",
      });
    }

    if (members < 1 || members > 4) {
      return res.status(400).json({
        message: "Each table supports 1 to 4 members",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Cancelled bookings cannot be updated",
      });
    }

    const bookedTableIds = await Booking.distinct("table", {
      _id: { $ne: bookingId },
      reservationDate,
      timeSlot,
      status: "confirmed",
    });

    const availableTable = await Table.findOne({
      table_capacity: { $gte: members },
      _id: { $nin: bookedTableIds },
    }).sort({ table_number: 1 });

    if (!availableTable) {
      return res.status(409).json({
        message: "No tables available for this date and time slot",
      });
    }

    booking.reservationDate = reservationDate;
    booking.timeSlot = timeSlot;
    booking.members = members;
    booking.notes = notes || "";
    booking.table = availableTable._id;

    await booking.save();

    await booking.populate("customer", "username email");
    await booking.populate("table", "table_number table_capacity");

    return res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Admin update booking error:", error.message);

    return res.status(500).json({
      message: "Failed to update booking",
    });
  }
};

export default adminUpdateBookingController;
