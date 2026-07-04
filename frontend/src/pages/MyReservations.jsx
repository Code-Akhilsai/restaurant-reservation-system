import { useEffect, useState } from "react";
import axios from "axios";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getBookings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/myreservations`,
        {
          withCredentials: true,
        },
      );

      setReservations(res.data.bookings || []);
    } catch (error) {
      console.error("Get bookings error:", error);
      setMessage(
        error.response?.data?.message || "Failed to load reservations",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/bookings/${bookingId}/cancel`,
        {},
        {
          withCredentials: true,
        },
      );

      setReservations((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking,
        ),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel reservation");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      {" "}
      <div className="mb-8">
        {" "}
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
          Customer dashboard{" "}
        </p>
        <h1 className="mt-2 text-3xl font-bold">My Reservations</h1>
        <p className="mt-2 text-slate-600">
          View or cancel your upcoming restaurant reservations.
        </p>
      </div>
      {loading && <p className="text-slate-600">Loading reservations...</p>}
      {!loading && message && (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">{message}</p>
      )}
      {!loading && !message && reservations.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold">No reservations yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Your table reservations will appear here.
          </p>
        </div>
      )}
      {!loading && reservations.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Table</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Members</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {reservations.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-3 font-medium">
                    {booking.table?.table_number
                      ? `Table ${booking.table.table_number}`
                      : "Table not assigned"}
                  </td>

                  <td className="px-4 py-3">{booking.reservationDate}</td>

                  <td className="px-4 py-3">{booking.timeSlot}</td>

                  <td className="px-4 py-3">{booking.members}</td>

                  <td className="max-w-48 truncate px-4 py-3">
                    {booking.notes || "-"}
                  </td>

                  <td className="px-4 py-3 capitalize">{booking.status}</td>

                  <td className="px-4 py-3">
                    {booking.status === "confirmed" ? (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                      >
                        Cancel
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default MyReservations;
