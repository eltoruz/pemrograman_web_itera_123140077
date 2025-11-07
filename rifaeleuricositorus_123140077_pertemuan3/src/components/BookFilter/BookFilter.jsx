"use client"
import "./BookFilter.css"

function BookFilter({ searchTerm, onSearchChange, filterStatus, onStatusChange }) {
  return (
    <div className="filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari buku atau penulis..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <select value={filterStatus} onChange={(e) => onStatusChange(e.target.value)} className="filter-select">
        <option value="all">Semua Status</option>
        <option value="ingin">Ingin Dibaca</option>
        <option value="sedang">Sedang Dibaca</option>
        <option value="selesai">Selesai Dibaca</option>
      </select>
    </div>
  )
}

export default BookFilter
