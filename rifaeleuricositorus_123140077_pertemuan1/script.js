let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// 🔹 Muat data dari localStorage saat halaman dibuka
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) tasks = savedTasks;
  renderTasks();
};

// 🔹 Simpan data ke localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔹 Validasi dan tambah tugas baru
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const course = document.getElementById("courseName").value.trim();
  const deadline = document.getElementById("deadline").value;

  if (!name || !course || !deadline) {
    alert("Semua field harus diisi!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name,
    course,
    deadline,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskForm.reset();
});

// 🔹 Render daftar tugas ke layar
function renderTasks() {
  const searchTerm = searchInput.value.toLowerCase();
  const filter = statusFilter.value;

  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    const matchSearch = task.course.toLowerCase().includes(searchTerm);
    const matchStatus =
      filter === "all" ||
      (filter === "done" && task.completed) ||
      (filter === "pending" && !task.completed);
    return matchSearch && matchStatus;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <div class="task-info">
        <strong class="${task.completed ? 'completed' : ''}">${task.name}</strong>
        <p>${task.course} | Deadline: ${task.deadline}</p>
      </div>
      <div class="task-actions">
        <button class="done-btn">${task.completed ? "Belum" : "Selesai"}</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Hapus</button>
      </div>
    `;

    // Selesai / belum
    li.querySelector(".done-btn").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Edit tugas
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const newName = prompt("Edit Nama Tugas:", task.name);
      const newCourse = prompt("Edit Mata Kuliah:", task.course);
      const newDeadline = prompt("Edit Deadline (YYYY-MM-DD):", task.deadline);

      if (newName && newCourse && newDeadline) {
        task.name = newName;
        task.course = newCourse;
        task.deadline = newDeadline;
        saveTasks();
        renderTasks();
      }
    });

    // Hapus tugas
    li.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Yakin ingin menghapus tugas ini?")) {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      }
    });

    taskList.appendChild(li);
  });

  const remaining = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `Tugas Belum Selesai: ${remaining}`;
}

// 🔹 Filter & Pencarian
searchInput.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);
