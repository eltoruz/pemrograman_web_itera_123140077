"use client"

import { useState } from "react"
import "./App.css"
import Navigation from "./components/Navigation"
import Stats from "./pages/Stats/Stats"
import Home from "./pages/Home/Home"
import { BookContext } from "./context/BookContext"
import { useLocalStorage } from "./hooks/useLocalStorage"

function App() {
  const [books, setBooks] = useLocalStorage("books", [])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState("home")
  const [editingBook, setEditingBook] = useState(null)

  // Add new book
  const handleAddBook = (book) => {
    if (editingBook) {
      setBooks(books.map((b) => (b.id === editingBook.id ? { ...book, id: editingBook.id } : b)))
      setEditingBook(null)
    } else {
      setBooks([...books, { ...book, id: Date.now() }])
    }
  }

  // Delete book
  const handleDeleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id))
  }

  // Edit book
  const handleEditBook = (book) => {
    setEditingBook(book)
  }

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || book.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      <div className="app">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

        <main className="app-content">
          {currentPage === "home" ? (
            <Home
              books={filteredBooks}
              onAddBook={handleAddBook}
              editingBook={editingBook}
              onEditClear={() => setEditingBook(null)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onStatusChange={setFilterStatus}
              onDeleteBook={handleDeleteBook}
              onEditBook={handleEditBook}
            />
          ) : (
            <Stats books={books} />
          )}
        </main>
      </div>
    </BookContext.Provider>
  )
}

export default App
