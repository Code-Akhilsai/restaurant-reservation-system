import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("registeredUser");
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user || user.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("registeredUser");
    window.dispatchEvent(new Event("authchange"));
    navigate("/", { replace: true });
  };

  const getAllBookings = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/admin/bookings`,
        {
          withCredentials: true,
        },
      );

      setReservations(res.data.bookings || []);
    } catch (error) {
      console.error("Admin bookings error:", error);

      setMessage(
        error.response?.data?.message || "Failed to load reservations",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdminCancel = async (bookingId) => {
    const shouldCancel = window.confirm("Cancel this customer's reservation?");

    if (!shouldCancel) return;

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/admin/bookings/${bookingId}/cancel`,
        {},
        {
          withCredentials: true,
        },
      );

      setReservations((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: res.data.booking.status }
            : booking,
        ),
      );
    } catch (error) {
      console.error("Admin cancel error:", error);
      alert(error.response?.data?.message || "Failed to cancel reservation");
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const totalReservations = reservations.length;

  const confirmedReservations = reservations.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const cancelledReservations = reservations.filter(
    (booking) => booking.status === "cancelled",
  ).length;

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            Restaurant Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            View and manage all restaurant reservations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading reservations...
        </div>
      )}

      {!loading && message && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600">
          {message}
        </div>
      )}

      {!loading && !message && (
        <>
          <section className="mb-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-sm text-slate-300">Total Reservations</p>
              <p className="mt-2 text-4xl font-bold">{totalReservations}</p>
            </div>

            <div className="rounded-2xl bg-emerald-600 p-6 text-white">
              <p className="text-sm text-emerald-100">Confirmed</p>
              <p className="mt-2 text-4xl font-bold">{confirmedReservations}</p>
            </div>

            <div className="rounded-2xl bg-red-500 p-6 text-white">
              <p className="text-sm text-red-100">Cancelled</p>
              <p className="mt-2 text-4xl font-bold">{cancelledReservations}</p>
            </div>
          </section>

          {reservations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-lg font-semibold text-slate-900">
                No reservations found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Customer bookings will appear here.
              </p>
            </div>
          ) : (
            <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900">
                  All Reservations
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Time</th>
                      <th className="px-6 py-4 font-semibold">Members</th>
                      <th className="px-6 py-4 font-semibold">Table</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {reservations.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {booking.customer?.username || "-"}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {booking.customer?.email || "-"}
                        </td>

                        <td className="px-6 py-4">{booking.reservationDate}</td>

                        <td className="px-6 py-4">{booking.timeSlot}</td>

                        <td className="px-6 py-4">{booking.members}</td>

                        <td className="px-6 py-4">
                          {booking.table?.table_number
                            ? `Table ${booking.table.table_number}`
                            : "-"}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                              booking.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {booking.status === "confirmed" ? (
                            <button
                              onClick={() => handleAdminCancel(booking._id)}
                              className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400">
                              No action
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default AdminDashboard;
