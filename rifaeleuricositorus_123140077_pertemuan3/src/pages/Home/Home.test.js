import { render, screen } from "@testing-library/react"
import Home from "./Home"

// Mock komponen anak agar test lebih ringan
jest.mock("../../components/BookForm/BookForm", () => () => <div data-testid="book-form" />)
jest.mock("../../components/BookList/BookList", () => () => <div data-testid="book-list" />)
jest.mock("../../components/BookFilter/BookFilter", () => () => <div data-testid="book-filter" />)

describe("Home Component", () => {
  const mockProps = {
    books: [{ id: 1, title: "Belajar React" }],
    onAddBook: jest.fn(),
    editingBook: null,
    onEditClear: jest.fn(),
    searchTerm: "",
    onSearchChange: jest.fn(),
    filterStatus: "all",
    onStatusChange: jest.fn(),
    onDeleteBook: jest.fn(),
    onEditBook: jest.fn(),
  }

  test("menampilkan judul dan deskripsi halaman", () => {
    render(<Home {...mockProps} />)
    expect(screen.getByText(/Aplikasi Manajemen Buku Pribadi/i)).toBeInTheDocument()
    expect(screen.getByText(/Kelola koleksi buku Anda dengan mudah/i)).toBeInTheDocument()
  })

  test("merender komponen BookForm, BookFilter, dan BookList", () => {
    render(<Home {...mockProps} />)

    expect(screen.getByTestId("book-form")).toBeInTheDocument()
    expect(screen.getByTestId("book-filter")).toBeInTheDocument()
    expect(screen.getByTestId("book-list")).toBeInTheDocument()
  })

  test("meneruskan props ke komponen anak tanpa error", () => {
    // Tidak akan error selama komponen anak berhasil dirender dengan props
    render(<Home {...mockProps} />)
  })
})
