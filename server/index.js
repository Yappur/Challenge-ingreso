const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Tarea de ejemplo", completed: false, createdAt: new Date() },
  { id: 2, title: "Otra tarea", completed: true, createdAt: new Date() },
];

let nextId = 3;

// RUTAS
// GET - Obtener todas las tareas
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET - Obtener una tarea por ID
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json(task);
});

// POST
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "El título es requerido" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

//PUT
app.put("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "El título es requerido" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title.trim(),
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    updatedAt: new Date(),
  };

  res.json(tasks[taskIndex]);
});

//PATCH
app.patch("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { completed } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    completed: completed,
    updatedAt: new Date(),
  };

  res.json(tasks[taskIndex]);
});

//DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ message: "Tarea eliminada", task: deletedTask });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
