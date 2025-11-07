import BookItem from "./BookItem"
import "./BookList.css"

function BookList({ books, onDeleteBook, onEditBook }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>Tidak ada buku</h3>
        <p>Mulai tambahkan buku baru ke koleksi Anda</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      <div className="list-header">
        <h3>Daftar Buku ({books.length})</h3>
      </div>
      <div className="books-container">
        {books.map((book) => (
          <BookItem key={book.id} book={book} onDelete={onDeleteBook} onEdit={onEditBook} />
        ))}
      </div>
    </div>
  )
}

export default BookList
