import { render, screen, fireEvent } from "@testing-library/react"
import Navigation from "./Navigation"

describe("Navigation Component", () => {
  test("menampilkan judul aplikasi dan dua tombol navigasi", () => {
    render(<Navigation currentPage="home" onPageChange={() => {}} />)

    // Pastikan judul muncul
    expect(screen.getByText(/BookManagerEltoruz/i)).toBeInTheDocument()

    // Pastikan tombol Beranda dan Statistik muncul
    expect(screen.getByText(/Beranda/i)).toBeInTheDocument()
    expect(screen.getByText(/Statistik/i)).toBeInTheDocument()
  })

  test("menambahkan kelas 'active' pada tombol halaman saat ini", () => {
    render(<Navigation currentPage="stats" onPageChange={() => {}} />)

    const statsButton = screen.getByText(/Statistik/i)
    expect(statsButton).toHaveClass("active")
  })

  test("memanggil onPageChange saat tombol diklik", () => {
    const mockFn = jest.fn()
    render(<Navigation currentPage="home" onPageChange={mockFn} />)

    const statsButton = screen.getByText(/Statistik/i)
    fireEvent.click(statsButton)

    expect(mockFn).toHaveBeenCalledWith("stats")
  })
})
