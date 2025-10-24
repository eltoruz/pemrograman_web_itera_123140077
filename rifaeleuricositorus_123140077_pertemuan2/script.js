// ============================================
// PERSONAL DASHBOARD - ES6+ Implementation
// ============================================

// ============================================
// 1. CLASS: Schedule Item
// ============================================
class ScheduleItem {
  constructor(name, time, room) {
    this.id = Date.now()
    this.name = name
    this.time = time
    this.room = room
  }

  toHTML = () => `
        <div class="item">
            <div class="item-content">
                <div class="item-title">${this.name}</div>
                <div class="item-meta">⏰ ${this.time} | 📍 ${this.room || "Tidak ditentukan"}</div>
            </div>
            <div class="item-actions">
                <button class="item-btn delete-btn" onclick="dashboard.deleteSchedule(${this.id})">Hapus</button>
            </div>
        </div>
    `
}

// ============================================
// 2. CLASS: Task Item
// ============================================
class TaskItem {
  constructor(title, desc, priority, deadline) {
    this.id = Date.now()
    this.title = title
    this.desc = desc
    this.priority = priority
    this.deadline = deadline
    this.completed = false
  }

  toHTML = () => `
        <div class="item ${this.completed ? "completed" : ""}">
            <div class="item-content">
                <div class="item-title">${this.title}</div>
                ${this.desc ? `<div class="item-meta">📝 ${this.desc}</div>` : ""}
                <div class="item-meta">📅 ${this.deadline || "Tidak ada deadline"}</div>
                <span class="priority-badge priority-${this.priority}">
                    ${this.priority === "high" ? "Tinggi" : this.priority === "medium" ? "Sedang" : "Rendah"}
                </span>
            </div>
            <div class="item-actions">
                <button class="item-btn complete-btn" onclick="dashboard.toggleTask(${this.id})">
                    ${this.completed ? "↩️ Buka" : "✓ Selesai"}
                </button>
                <button class="item-btn delete-btn" onclick="dashboard.deleteTask(${this.id})">Hapus</button>
            </div>
        </div>
    `
}

// ============================================
// 3. CLASS: Note Item
// ============================================
class NoteItem {
  constructor(title, content) {
    this.id = Date.now()
    this.title = title
    this.content = content
    this.createdAt = new Date().toLocaleDateString("id-ID")
  }

  toHTML = () => `
        <div class="item">
            <div class="item-content">
                <div class="item-title">${this.title}</div>
                <div class="item-meta">${this.content}</div>
                <div class="item-meta">📅 ${this.createdAt}</div>
            </div>
            <div class="item-actions">
                <button class="item-btn delete-btn" onclick="dashboard.deleteNote(${this.id})">Hapus</button>
            </div>
        </div>
    `
}

// ============================================
// 4. CLASS: Dashboard Manager
// ============================================
class Dashboard {
  constructor() {
    this.schedules = []
    this.tasks = []
    this.notes = []
    this.loadFromStorage()
    this.initializeEventListeners()
    this.updateTime()
    this.fetchWeatherData()
    setInterval(() => this.updateTime(), 1000)
    setInterval(() => this.fetchWeatherData(), 300000) // Update cuaca setiap 5 menit
  }

  // Arrow Function: Initialize Event Listeners
  initializeEventListeners = () => {
    document.getElementById("toggleScheduleForm").addEventListener("click", () => this.toggleForm("scheduleForm"))
    document.getElementById("toggleTaskForm").addEventListener("click", () => this.toggleForm("taskForm"))
    document.getElementById("toggleNoteForm").addEventListener("click", () => this.toggleForm("noteForm"))

    document.getElementById("scheduleForm").addEventListener("submit", (e) => this.addSchedule(e))
    document.getElementById("taskForm").addEventListener("submit", (e) => this.addTask(e))
    document.getElementById("noteForm").addEventListener("submit", (e) => this.addNote(e))

    document.getElementById("refreshWeather").addEventListener("click", () => this.fetchWeatherData())
  }

  // Arrow Function: Toggle Form Display
  toggleForm = (formId) => {
    const form = document.getElementById(formId)
    form.style.display = form.style.display === "none" ? "flex" : "none"
  }

  // ============================================
  // 5. ASYNC/AWAIT: Fetch Weather Data (Simulasi)
  // ============================================
  fetchWeatherData = async () => {
    try {
      const weatherData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            temp: Math.floor(Math.random() * 15 + 20),
            humidity: Math.floor(Math.random() * 40 + 40),
            windSpeed: Math.floor(Math.random() * 20 + 5),
            condition: ["Cerah", "Berawan", "Hujan", "Mendung"][Math.floor(Math.random() * 4)],
          })
        }, 500)
      })

      // Template Literal: Render weather
      const weatherContent = document.getElementById("weatherContent")
      weatherContent.innerHTML = `
                <div class="weather-item">
                    <div class="label">🌡️ Suhu</div>
                    <div class="value">${weatherData.temp}°C</div>
                </div>
                <div class="weather-item">
                    <div class="label">💧 Kelembaban</div>
                    <div class="value">${weatherData.humidity}%</div>
                </div>
                <div class="weather-item">
                    <div class="label">💨 Kecepatan Angin</div>
                    <div class="value">${weatherData.windSpeed} km/h</div>
                </div>
                <div class="weather-item">
                    <div class="label">☁️ Kondisi</div>
                    <div class="value">${weatherData.condition}</div>
                </div>
            `
    } catch (error) {
      console.error("Error fetching weather:", error)
      document.getElementById("weatherContent").innerHTML = "<p class='empty-message'>Gagal memuat data cuaca</p>"
    }
  }

  // Add Schedule
  addSchedule = (e) => {
    e.preventDefault()
    const name = document.getElementById("scheduleName").value
    const time = document.getElementById("scheduleTime").value
    const room = document.getElementById("scheduleRoom").value

    const schedule = new ScheduleItem(name, time, room)
    this.schedules.push(schedule)
    this.saveToStorage()
    this.renderSchedules()
    document.getElementById("scheduleForm").reset()
    this.toggleForm("scheduleForm")
  }

  // Delete Schedule
  deleteSchedule = (id) => {
    this.schedules = this.schedules.filter((s) => s.id !== id)
    this.saveToStorage()
    this.renderSchedules()
  }

  // Arrow Function: Render Schedules
  renderSchedules = () => {
    const list = document.getElementById("scheduleList")
    list.innerHTML =
      this.schedules.length === 0
        ? '<div class="empty-message">Belum ada jadwal. Tambahkan jadwal baru!</div>'
        : this.schedules.map((s) => s.toHTML()).join("")
  }

  // Add Task
  addTask = (e) => {
    e.preventDefault()
    const title = document.getElementById("taskTitle").value
    const desc = document.getElementById("taskDesc").value
    const priority = document.getElementById("taskPriority").value
    const deadline = document.getElementById("taskDeadline").value

    const task = new TaskItem(title, desc, priority, deadline)
    this.tasks.push(task)
    this.saveToStorage()
    this.renderTasks()
    document.getElementById("taskForm").reset()
    this.toggleForm("taskForm")
  }

  // Toggle Task Completion
  toggleTask = (id) => {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveToStorage()
      this.renderTasks()
    }
  }

  // Delete Task
  deleteTask = (id) => {
    this.tasks = this.tasks.filter((t) => t.id !== id)
    this.saveToStorage()
    this.renderTasks()
  }

  // Arrow Function: Render Tasks
  renderTasks = () => {
    const list = document.getElementById("taskList")
    list.innerHTML =
      this.tasks.length === 0
        ? '<div class="empty-message">Belum ada tugas. Tambahkan tugas baru!</div>'
        : this.tasks.map((t) => t.toHTML()).join("")
  }

  // Add Note
  addNote = (e) => {
    e.preventDefault()
    const title = document.getElementById("noteTitle").value
    const content = document.getElementById("noteContent").value

    const note = new NoteItem(title, content)
    this.notes.push(note)
    this.saveToStorage()
    this.renderNotes()
    document.getElementById("noteForm").reset()
    this.toggleForm("noteForm")
  }

  // Delete Note
  deleteNote = (id) => {
    this.notes = this.notes.filter((n) => n.id !== id)
    this.saveToStorage()
    this.renderNotes()
  }

  // Arrow Function: Render Notes
  renderNotes = () => {
    const list = document.getElementById("noteList")
    list.innerHTML =
      this.notes.length === 0
        ? '<div class="empty-message">Belum ada catatan. Tambahkan catatan baru!</div>'
        : this.notes.map((n) => n.toHTML()).join("")
  }

  // Update Time Display
  updateTime = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString("id-ID")
    document.getElementById("timeDisplay").textContent = timeString
  }

  // Save to localStorage
  saveToStorage = () => {
    localStorage.setItem("dashboard_schedules", JSON.stringify(this.schedules))
    localStorage.setItem("dashboard_tasks", JSON.stringify(this.tasks))
    localStorage.setItem("dashboard_notes", JSON.stringify(this.notes))
  }

  // Load from localStorage
  loadFromStorage = () => {
    const schedules = localStorage.getItem("dashboard_schedules")
    const tasks = localStorage.getItem("dashboard_tasks")
    const notes = localStorage.getItem("dashboard_notes")

    if (schedules) {
      this.schedules = JSON.parse(schedules).map((s) => new ScheduleItem(s.name, s.time, s.room))
    }
    if (tasks) {
      this.tasks = JSON.parse(tasks).map((t) => {
        const task = new TaskItem(t.title, t.desc, t.priority, t.deadline)
        task.id = t.id
        task.completed = t.completed
        return task
      })
    }
    if (notes) {
      this.notes = JSON.parse(notes).map((n) => {
        const note = new NoteItem(n.title, n.content)
        note.id = n.id
        note.createdAt = n.createdAt
        return note
      })
    }

    this.renderSchedules()
    this.renderTasks()
    this.renderNotes()
  }
}

// ============================================
// Initialize Dashboard
// ============================================
const dashboard = new Dashboard()
