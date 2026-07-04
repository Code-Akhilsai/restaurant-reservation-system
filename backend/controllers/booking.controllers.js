import { Booking } from "../models/booking.models.js";
import { Table } from "../models/table.models.js";

const bookingController = async (req, res) => {
  const { reservationDate, timeSlot, members, notes } = req.body;

  try {
    const { _id: userId } = req.verified_user;

    if (!reservationDate || !timeSlot || !members) {
      return res.status(400).json({
        message: "Date, time slot, and number of members are required",
      });
    }

    if (members < 1 || members > 4) {
      return res.status(400).json({
        message: "Each table supports 1 to 4 members",
      });
    }

    const bookedTableIds = await Booking.distinct("table", {
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

    const booking = await Booking.create({
      customer: userId,
      table: availableTable._id,
      reservationDate,
      timeSlot,
      members,
      notes,
    });

    await booking.populate("table", "table_number table_capacity");

    return res.status(201).json({
      message: "Table booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error full:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export default bookingController;
