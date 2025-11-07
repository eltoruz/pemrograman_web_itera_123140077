import { renderHook } from "@testing-library/react"
import { useBookStats } from "./useBookStats"

describe("useBookStats Hook", () => {
  test("mengembalikan semua nilai 0 jika daftar buku kosong", () => {
    const { result } = renderHook(() => useBookStats([]))
    expect(result.current.totalBooks).toBe(0)
    expect(result.current.readBooks).toBe(0)
    expect(result.current.readingBooks).toBe(0)
    expect(result.current.wantToReadBooks).toBe(0)
    expect(result.current.avgBooksPerAuthor).toBe(0)
  })

  test("menghitung total buku dengan benar", () => {
    const books = [
      { title: "Buku 1", author: "A", status: "selesai" },
      { title: "Buku 2", author: "B", status: "sedang" },
    ]
    const { result } = renderHook(() => useBookStats(books))
    expect(result.current.totalBooks).toBe(2)
  })

  test("menghitung jumlah buku selesai dengan benar", () => {
    const books = [
      { title: "A", author: "A", status: "selesai" },
      { title: "B", author: "A", status: "ingin" },
      { title: "C", author: "B", status: "selesai" },
    ]
    const { result } = renderHook(() => useBookStats(books))
    expect(result.current.readBooks).toBe(2)
  })

  test("menghitung jumlah buku sedang dibaca dengan benar", () => {
    const books = [
      { title: "A", author: "A", status: "sedang" },
      { title: "B", author: "B", status: "ingin" },
    ]
    const { result } = renderHook(() => useBookStats(books))
    expect(result.current.readingBooks).toBe(1)
  })

  test("menghitung rata-rata buku per penulis dengan benar", () => {
    const books = [
      { title: "Buku 1", author: "A", status: "selesai" },
      { title: "Buku 2", author: "A", status: "sedang" },
      { title: "Buku 3", author: "B", status: "ingin" },
    ]
    const { result } = renderHook(() => useBookStats(books))
    // 3 buku, 2 penulis → 3/2 = 1.5
    expect(result.current.avgBooksPerAuthor).toBe("1.5")
  })
})
