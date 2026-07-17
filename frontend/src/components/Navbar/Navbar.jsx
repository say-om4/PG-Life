import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaArrowLeft } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isHomePage = location.pathname === "/";

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">

        <div className="d-flex align-items-center gap-2">
          {!isHomePage && (
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary btn-sm p-0 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "35px", height: "35px" }}
              title="Go Back"
            >
              <FaArrowLeft size={14} />
            </button>
          )}

          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold m-0" to="/">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
              <path d="M16 3L4 13V26C4 27.1 4.9 28 6 28H26C27.1 28 28 27.1 28 26V13L16 3Z" fill="url(#logo-grad)" />
              <path d="M10 21C12.5 19.5 19.5 19.5 22 21" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M7 24C10.5 22.5 21.5 22.5 25 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M13 13C13 11.3 14.3 10 16 10C17.7 10 19 11.3 19 13C19 14.7 17.7 16 16 16C14.3 16 13 14.7 13 13Z" fill="#ffffff" />
              <defs>
                <linearGradient id="logo-grad" x1="4" y1="3" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f59e0b" />
                  <stop offset="1" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ background: 'linear-gradient(to right, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StayNest</span>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link text-uppercase fw-semibold px-3" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-uppercase fw-semibold px-3" to="/pgs">Listings</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-uppercase fw-semibold px-3" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-uppercase fw-semibold px-3" to="/contact">Contact</Link>
            </li>

            {user ? (
              <>
                <li className="nav-item px-2">
                  <span className="badge bg-light text-dark p-2 border">
                    👤 {user.full_name} ({user.role === 'admin' ? 'Admin' : 'Host'})
                  </span>
                </li>

                <li className="nav-item">
                  <Link
                    to="/admin"
                    className="btn btn-outline-dark btn-sm ms-2"
                  >
                    💼 Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/profile"
                    className="btn btn-outline-primary btn-sm ms-2"
                  >
                    👤 Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/wishlist"
                    className="btn btn-outline-danger btn-sm ms-2"
                  >
                    ❤️ Wishlist
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-sm ms-3"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/register"
                    className="btn btn-outline-primary btn-sm ms-2"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm p-2 rounded-circle d-flex align-items-center justify-content-center"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                style={{ width: "35px", height: "35px" }}
              >
                {theme === "light" ? <FaMoon size={15} /> : <FaSun size={15} />}
              </button>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;