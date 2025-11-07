import { useBookStats } from "../../hooks/useBookStats"
import "./Stats.css"

function Stats({ books }) {
  const stats = useBookStats(books)

  const statCards = [
    {
      label: "Total Buku",
      value: stats.totalBooks,
      icon: "📚",
      color: "primary",
    },
    {
      label: "Selesai Dibaca",
      value: stats.readBooks,
      icon: "✅",
      color: "success",
    },
    {
      label: "Sedang Dibaca",
      value: stats.readingBooks,
      icon: "📖",
      color: "warning",
    },
    {
      label: "Ingin Dibaca",
      value: stats.wantToReadBooks,
      icon: "❤️",
      color: "info",
    },
  ]

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1>Statistik Koleksi Buku</h1>
        <p>Lihat ringkasan koleksi buku Anda</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className={`stat-card stat-${card.color}`}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {books.length > 0 && (
        <div className="stats-additional">
          <div className="stat-box">
            <h3>Rata-rata Buku per Penulis</h3>
            <div className="stat-display">{stats.avgBooksPerAuthor}</div>
          </div>

          <div className="stat-box">
            <h3>Jumlah Penulis Unik</h3>
            <div className="stat-display">{new Set(books.map((b) => b.author)).size}</div>
          </div>
        </div>
      )}

      {books.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>Belum ada data statistik</h3>
          <p>Tambahkan buku untuk melihat statistik koleksi Anda</p>
        </div>
      )}
    </div>
  )
}

export default Stats
