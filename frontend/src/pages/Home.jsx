import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("registeredUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-orange-600" : "text-slate-600 hover:text-orange-600"
    }`;

  useEffect(() => {
    const handleAuthChange = () => {
      const savedUser = localStorage.getItem("registeredUser");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("authchange", handleAuthChange);

    return () => {
      window.removeEventListener("authchange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("registeredUser");
    setUser(null);

    window.dispatchEvent(new Event("authchange"));
    nav("/");
  };

  const handle_bookingnav = async () => {
    nav("/book-table");
  };
  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-xl font-bold text-slate-900">
            Table<span className="text-orange-600">Ease</span>
          </Link>

          <div className="flex items-center gap-5">
            {user ? (
              <>
                {user.role === "customer" && (
                  <NavLink to="/my-reservations" className={navClass}>
                    My Bookings
                  </NavLink>
                )}

                {user.role === "admin" && (
                  <NavLink to="/admin" className={navClass}>
                    Admin Dashboard
                  </NavLink>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </header>

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

          {user?.role === "admin" ? null : (
            <Link
              onClick={handle_bookingnav}
              to="/book-table"
              className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Book a Table
            </Link>
          )}
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

      <footer className="border-t border-slate-200 bg-white px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>TableEase Reservation System</p>
          <p>Simple booking for customers and admins.</p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
