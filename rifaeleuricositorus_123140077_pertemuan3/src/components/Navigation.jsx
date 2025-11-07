"use client"
import "./Navigation.css"

function Navigation({ currentPage, onPageChange }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">📚</span>
          <h1>BookManagerEltoruz</h1>
        </div>

        <div className="nav-links">
          <button className={`nav-link ${currentPage === "home" ? "active" : ""}`} onClick={() => onPageChange("home")}>
            Beranda
          </button>
          <button
            className={`nav-link ${currentPage === "stats" ? "active" : ""}`}
            onClick={() => onPageChange("stats")}
          >
            Statistik
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
