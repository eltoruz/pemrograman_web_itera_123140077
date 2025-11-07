import { renderHook, act } from "@testing-library/react"
import { useLocalStorage } from "./useLocalStorage"

// Mock localStorage agar bisa diuji di lingkungan test
beforeEach(() => {
  const store = {}
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      for (const key in store) delete store[key]
    },
  }
})

describe("useLocalStorage Hook", () => {
  test("mengembalikan nilai awal jika localStorage kosong", () => {
    const { result } = renderHook(() => useLocalStorage("books", []))
    expect(result.current[0]).toEqual([]) // Nilai awal
  })

  test("mengambil nilai dari localStorage jika sudah ada data", () => {
    localStorage.setItem("books", JSON.stringify([{ title: "Buku 1" }]))
    const { result } = renderHook(() => useLocalStorage("books", []))
    expect(result.current[0]).toEqual([{ title: "Buku 1" }])
  })

  test("menyimpan nilai baru ke localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("books", []))
    act(() => {
      result.current[1]([{ title: "Buku Baru" }])
    })
    expect(JSON.parse(localStorage.getItem("books"))).toEqual([{ title: "Buku Baru" }])
  })

  test("mendukung fungsi updater (callback function)", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1))
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    expect(result.current[0]).toBe(2)
  })

  test("tidak error jika JSON localStorage rusak", () => {
    localStorage.setItem("broken", "{not valid json}")
    const { result } = renderHook(() => useLocalStorage("broken", "fallback"))
    expect(result.current[0]).toBe("fallback")
  })
})
