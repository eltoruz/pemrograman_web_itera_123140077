"use client"

import { useMemo } from "react"

export function useBookStats(books) {
  return useMemo(() => {
    return {
      totalBooks: books.length,
      readBooks: books.filter((b) => b.status === "selesai").length,
      readingBooks: books.filter((b) => b.status === "sedang").length,
      wantToReadBooks: books.filter((b) => b.status === "ingin").length,
      avgBooksPerAuthor: books.length > 0 ? (books.length / new Set(books.map((b) => b.author)).size).toFixed(1) : 0,
    }
  }, [books])
}
