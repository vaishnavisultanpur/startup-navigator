import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Compass, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Topics" },
  { to: "/search", label: "AI Search" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors focus-ring rounded px-1 ${
      isActive ? "text-amber-500" : "text-paper/80 hover:text-amber-400"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-navy-700">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded" onClick={() => setOpen(false)}>
          <Compass className="w-6 h-6 text-amber-500" strokeWidth={1.75} />
          <span className="font-display text-lg text-paper tracking-tight">
            Startup Navigator
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              {user.is_admin && (
                <NavLink to="/admin" className={linkClass}>
                  Admin
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-paper/80 hover:text-amber-400 transition-colors focus-ring rounded px-2 py-1"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-paper/80 hover:text-amber-400 transition-colors focus-ring rounded px-2 py-1"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-amber-500 text-navy-950 px-4 py-2 rounded-full hover:bg-amber-400 transition-colors focus-ring"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-paper focus-ring rounded p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-navy-900 border-t border-navy-700 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
              {user.is_admin && (
                <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>
                  Admin
                </NavLink>
              )}
              <button onClick={handleLogout} className="text-left text-sm font-medium text-paper/80">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass} onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-amber-500 text-navy-950 px-4 py-2 rounded-full w-fit"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
