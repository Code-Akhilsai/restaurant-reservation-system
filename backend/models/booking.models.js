import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    reservationDate: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

// Preventing duplicate active bookings for the same table, date, and time.
bookingSchema.index(
  { table: 1, reservationDate: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "confirmed" },
  },
);

export const Booking = mongoose.model("Booking", bookingSchema);
