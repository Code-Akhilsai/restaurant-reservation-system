import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isRegisteredUser, setIsRegisteredUser] = useState(() =>
    Boolean(localStorage.getItem("registeredUser")),
  );

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-orange-600" : "text-slate-600 hover:text-orange-600"
    }`;

  useEffect(() => {
    const handleAuthChange = () => {
      setIsRegisteredUser(Boolean(localStorage.getItem("registeredUser")));
    };

    window.addEventListener("authchange", handleAuthChange);

    return () => {
      window.removeEventListener("authchange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("registeredUser");
    setIsRegisteredUser(false);
    window.dispatchEvent(new Event("authchange"));
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-xl font-bold text-slate-900">
          Table<span className="text-orange-600">Ease</span>
        </Link>

        <div className="flex items-center gap-5">
          {isRegisteredUser ? (
            <>
              <NavLink to="/my-reservations" className={navClass}>
                My Reservations
              </NavLink>
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
  );
}

export default Navbar;
