import { createContext } from "react"

export const BookContext = createContext()

export const BookProvider = ({ children }) => {
  // Nilai default akan disediakan dari App.jsx
  return <BookContext.Provider value={{}}>{children}</BookContext.Provider>
}
