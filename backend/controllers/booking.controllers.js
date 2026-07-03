import { Booking } from "../models/booking.models.js";

const bookingController = async (req, res) => {
  const { _id, email } = req.verified_user ?? {};
};

export default bookingController;
