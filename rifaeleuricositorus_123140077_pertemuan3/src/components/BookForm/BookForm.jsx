"use client"

import { useState, useEffect } from "react"
import "./BookForm.css"

function BookForm({ onAddBook, editingBook, onEditClear }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "ingin",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook)
    } else {
      setFormData({ title: "", author: "", status: "ingin" })
      setErrors({})
    }
  }, [editingBook])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Judul buku tidak boleh kosong"
    }

    if (!formData.author.trim()) {
      newErrors.author = "Nama penulis tidak boleh kosong"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onAddBook(formData)
    setFormData({ title: "", author: "", status: "ingin" })
    setErrors({})
  }

  const handleCancel = () => {
    setFormData({ title: "", author: "", status: "ingin" })
    setErrors({})
    onEditClear()
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{editingBook ? "Edit Buku" : "Tambah Buku Baru"}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul Buku *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan judul buku"
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Masukkan nama penulis"
          className={errors.author ? "input-error" : ""}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Baca</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="ingin">Ingin Dibaca</option>
          <option value="sedang">Sedang Dibaca</option>
          <option value="selesai">Selesai Dibaca</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {editingBook ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
        {editingBook && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

export default BookForm
