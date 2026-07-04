import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const BookTable = () => {
  const navigate = useNavigate();

  const [reservationDate, setReservationDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [members, setMembers] = useState(4);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/auth/bookings`,
        {
          reservationDate,
          timeSlot,
          members,
          notes,
        },
        {
          withCredentials: true,
        },
      );

      const tableNumber = res.data.booking.table.table_number;

      alert(
        `Reservation confirmed!\n\nDate: ${reservationDate}\nTime: ${timeSlot}\nMembers: ${members}\nAssigned Table: ${tableNumber}`,
      );

      setReservationDate("");
      setTimeSlot("");
      setMembers(4);
      setNotes("");

      navigate("/my-reservations");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white p-8">
      {" "}
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        {" "}
        <div className="mb-4 flex items-center gap-3">
          {" "}
          <Link to="/" className="text-sm text-gray-600 hover:text-orange-500">
            ← Back{" "}
          </Link>
          <h2 className="m-0 text-lg font-semibold">Book a Table</h2>
        </div>
        <form className="grid gap-3" onSubmit={submit}>
          <label className="flex flex-col gap-2 text-sm text-gray-900">
            Date
            <input
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-900">
            Time
            <input
              required
              type="time"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-900">
            Members
            <select
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-900">
            Notes <span className="text-xs text-gray-400">(optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              maxLength={300}
              placeholder="Any special request?"
              className="resize-y rounded-lg border border-gray-200 bg-white px-3 pt-2 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <div className="mt-1 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-linear-to-r from-orange-400 to-pink-500 px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Booking..." : "Reserve Table"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default BookTable;
