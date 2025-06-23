import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // GET - Obtener todas las tareas
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  // POST - Crear nueva tarea
  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (response.ok) {
        const task = await response.json();
        setTasks([...tasks, task]);
        setNewTask("");
      }
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // PATCH - Cambiar estado completado
  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // PUT - Actualizar título de tarea
  const updateTask = async (id) => {
    if (!editingTitle.trim()) return;

    try {
      const task = tasks.find((t) => t.id === id);
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingTitle,
          completed: task.completed,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
        setEditingTask(null);
        setEditingTitle("");
      }
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // DELETE - Eliminar tarea
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditingTitle("");
  };

  if (loading) {
    return <div className="loading">Cargando tareas...</div>;
  }

  return (
    <div className="App">
      <h1 className="font-light text-4xl">Lista de Tareas</h1>

      {/* Formulario para nueva tarea */}
      <form onSubmit={createTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea..."
          className="task-input"
        />
        <button type="submit" className="add-btn">
          Agregar
        </button>
      </form>

      {/* Lista de tareas */}
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="no-tasks ">No hay tareas</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`task ${task.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id, task.completed)}
                className="task-checkbox"
              />

              {editingTask === task.id ? (
                <div className="editing">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="edit-input"
                  />
                  <button
                    onClick={() => updateTask(task.id)}
                    className="save-btn"
                  >
                    Guardar
                  </button>
                  <button onClick={cancelEditing} className="cancel-btn">
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="task-content">
                  <span className="task-title">{task.title}</span>
                  <div className="task-actions">
                    <button
                      onClick={() => startEditing(task)}
                      className="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
