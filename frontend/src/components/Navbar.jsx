import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-orange-600" : "text-slate-600 hover:text-orange-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-xl font-bold text-slate-900">
          Table<span className="text-orange-600">Ease</span>
        </Link>

        <div className="flex items-center gap-5">
          {/*
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/book-table" className={navClass}>
            Book Table
          </NavLink>
          <NavLink to="/my-reservations" className={navClass}>
            My Reservations
          </NavLink>
          */}
          <NavLink
            to="/login"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
