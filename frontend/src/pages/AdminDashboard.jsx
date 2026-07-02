const reservations = [
  {
    id: "RSV-1001",
    customer: "Akhil Sai",
    date: "10 July 2026",
    time: "7:00 PM",
    guests: 2,
    table: 4,
    status: "Confirmed",
  },
  {
    id: "RSV-1002",
    customer: "Rahul Kumar",
    date: "10 July 2026",
    time: "8:00 PM",
    guests: 4,
    table: 7,
    status: "Confirmed",
  },
  {
    id: "RSV-1003",
    customer: "Priya Sharma",
    date: "11 July 2026",
    time: "7:00 PM",
    guests: 3,
    table: 2,
    status: "Cancelled",
  },
];

function AdminDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
          Restaurant management
        </p>
        <h1 className="mt-2 text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <section className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-6 text-white">
          <p className="text-sm text-slate-300">Total Reservations</p>
          <p className="mt-2 text-4xl font-bold">24</p>
        </div>

        <div className="rounded-2xl bg-orange-500 p-6 text-white">
          <p className="text-sm text-orange-100">Today’s Reservations</p>
          <p className="mt-2 text-4xl font-bold">8</p>
        </div>

        <div className="rounded-2xl bg-emerald-600 p-6 text-white">
          <p className="text-sm text-emerald-100">Available Tables</p>
          <p className="mt-2 text-4xl font-bold">12</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-xl font-bold">Recent Reservations</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Booking ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Guests</th>
                <th className="px-6 py-4 font-semibold">Table</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-t border-slate-100 text-sm"
                >
                  <td className="px-6 py-4 font-semibold">{reservation.id}</td>
                  <td className="px-6 py-4">{reservation.customer}</td>
                  <td className="px-6 py-4">
                    {reservation.date}, {reservation.time}
                  </td>
                  <td className="px-6 py-4">{reservation.guests}</td>
                  <td className="px-6 py-4">Table {reservation.table}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        reservation.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
