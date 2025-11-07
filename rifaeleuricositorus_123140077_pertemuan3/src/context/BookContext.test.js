import { render, screen } from "@testing-library/react"
import { useContext } from "react"
import { BookContext, BookProvider } from "./BookContext"

describe("BookContext", () => {
  test("dapat me-render BookProvider tanpa error", () => {
    render(
      <BookProvider>
        <div>Child Component</div>
      </BookProvider>
    )
    expect(screen.getByText("Child Component")).toBeInTheDocument()
  })

  test("context menyediakan nilai default (objek kosong)", () => {
    const TestComponent = () => {
      const context = useContext(BookContext)
      return <div>{JSON.stringify(context)}</div>
    }

    render(
      <BookProvider>
        <TestComponent />
      </BookProvider>
    )

    // Karena BookProvider diisi {{}}, hasil JSON-nya "{}"
    expect(screen.getByText("{}")).toBeInTheDocument()
  })

  test("context bisa diakses oleh child component", () => {
    const customValue = { books: [{ title: "React Testing" }], setBooks: jest.fn() }

    const TestComponent = () => {
      const context = useContext(BookContext)
      return <div>{context.books?.[0]?.title}</div>
    }

    render(
      <BookContext.Provider value={customValue}>
        <TestComponent />
      </BookContext.Provider>
    )

    expect(screen.getByText("React Testing")).toBeInTheDocument()
  })
})
