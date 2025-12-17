import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useTheme } from "../contexts/useTheme";


export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthed, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          CourseHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                خانه
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                جستجوی دوره‌ها
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reviews">
                نقد و بررسی
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={toggleTheme}
              title="Dark/Light"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            {isAuthed ? (
              <>
                <span className="text-light small d-none d-lg-inline">
                  سلام، {user?.name}
                </span>
                <NavLink className="btn btn-outline-light btn-sm" to="/profile">
                  پروفایل
                </NavLink>
                <button className="btn btn-warning btn-sm" onClick={onLogout}>
                  خروج
                </button>
              </>
            ) : (
              <NavLink className="btn btn-success btn-sm" to="/auth">
                ورود / ثبت‌نام
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
