import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearAuthStorage, getAuthConfig } from "../utils/auth";
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
function AdminDashboard() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({
    reservationDate: "",
    timeSlot: "",
    members: 1,
    notes: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("registeredUser");
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user || user.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAuthStorage();
    window.dispatchEvent(new Event("authchange"));
    navigate("/", { replace: true });
  };

  const getAllBookings = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await axios.get(
        `${API_URL}/api/auth/admin/bookings`,
        getAuthConfig(),
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
        `${API_URL}/api/auth/admin/bookings/${bookingId}/cancel`,
        {},
        getAuthConfig(),
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

  const openEditModal = (booking) => {
    setEditingBooking(booking);

    setEditForm({
      reservationDate: booking.reservationDate,
      timeSlot: booking.timeSlot,
      members: booking.members,
      notes: booking.notes || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previousForm) => ({
      ...previousForm,
      [name]: name === "members" ? Number(value) : value,
    }));
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `${API_URL}/api/auth/admin/bookings/${editingBooking._id}`,
        editForm,
        getAuthConfig(),
      );

      setReservations((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === editingBooking._id ? res.data.booking : booking,
        ),
      );

      setEditingBooking(null);
    } catch (error) {
      console.error("Admin update error:", error);
      alert(error.response?.data?.message || "Failed to update reservation");
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
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditModal(booking)}
                                className="rounded-md bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-100"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleAdminCancel(booking._id)}
                                className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                              >
                                Cancel
                              </button>
                            </div>
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

      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <form
            onSubmit={handleUpdateBooking}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Update Reservation
              </h2>

              <button
                type="button"
                onClick={() => setEditingBooking(null)}
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Date
                <input
                  required
                  type="date"
                  name="reservationDate"
                  value={editForm.reservationDate}
                  onChange={handleEditChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Time
                <input
                  required
                  type="time"
                  name="timeSlot"
                  value={editForm.timeSlot}
                  onChange={handleEditChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Members
                <select
                  name="members"
                  value={editForm.members}
                  onChange={handleEditChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400"
                >
                  {[1, 2, 3, 4].map((number) => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? "person" : "people"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Notes
                <textarea
                  name="notes"
                  value={editForm.notes}
                  onChange={handleEditChange}
                  rows={3}
                  maxLength={300}
                  className="resize-none rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingBooking(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;
