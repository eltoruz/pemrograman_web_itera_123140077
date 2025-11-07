import BookForm from "../../components/BookForm/BookForm"
import BookList from "../../components/BookList/BookList"
import BookFilter from "../../components/BookFilter/BookFilter"

export default function Home({
  books,
  onAddBook,
  editingBook,
  onEditClear,
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange,
  onDeleteBook,
  onEditBook,
}) {
  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Aplikasi Manajemen Buku Pribadi</h1>
        <p>Kelola koleksi buku Anda dengan mudah</p>
      </div>

      <div className="home-container">
        <div className="form-section">
          <BookForm onAddBook={onAddBook} editingBook={editingBook} onEditClear={onEditClear} />
        </div>

        <div className="list-section">
          <div className="search-filter-container">
            <BookFilter
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              filterStatus={filterStatus}
              onStatusChange={onStatusChange}
            />
          </div>

          <BookList books={books} onDeleteBook={onDeleteBook} onEditBook={onEditBook} />
        </div>
      </div>
    </div>
  )
}
