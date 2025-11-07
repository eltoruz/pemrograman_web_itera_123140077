"use client"
import "./BookItem.css"

function BookItem({ book, onDelete, onEdit }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "selesai":
        return "success"
      case "sedang":
        return "warning"
      case "ingin":
        return "info"
      default:
        return "info"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "selesai":
        return "Selesai Dibaca"
      case "sedang":
        return "Sedang Dibaca"
      case "ingin":
        return "Ingin Dibaca"
      default:
        return status
    }
  }

  return (
    <div className="book-item">
      <div className="book-content">
        <div className="book-info">
          <h4 className="book-title">{book.title}</h4>
          <p className="book-author">Oleh: {book.author}</p>
        </div>
        <span className={`book-status status-${getStatusColor(book.status)}`}>{getStatusLabel(book.status)}</span>
      </div>
      <div className="book-actions">
        <button className="btn-icon btn-edit" onClick={() => onEdit(book)} title="Edit buku">
          ✏️
        </button>
        <button className="btn-icon btn-delete" onClick={() => onDelete(book.id)} title="Hapus buku">
          🗑️
        </button>
      </div>
    </div>
  )
}

export default BookItem
