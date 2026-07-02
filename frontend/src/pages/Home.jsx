import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="bg-linear-to-br from-slate-950 via-slate-900 to-orange-950 px-5 py-24 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Restaurant Reservation System
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Reserve your perfect table in seconds.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A simple way to book tables, manage reservations, and avoid booking
            conflicts.
          </p>

          <Link
            to="/book-table"
            className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Book a Table
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">📅</div>
          <h2 className="text-xl font-bold">Easy Booking</h2>
          <p className="mt-2 text-slate-600">
            Choose your date, time, guest count, and reserve a table quickly.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">🛡️</div>
          <h2 className="text-xl font-bold">No Conflicts</h2>
          <p className="mt-2 text-slate-600">
            The system prevents duplicate reservations for the same table slot.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">📊</div>
          <h2 className="text-xl font-bold">Admin Control</h2>
          <p className="mt-2 text-slate-600">
            Restaurant admins can view and manage all customer bookings.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
