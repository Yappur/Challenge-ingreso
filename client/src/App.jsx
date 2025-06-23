import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import "./index.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  // GET
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

  const createTask = async (title) => {
    if (!title.trim()) return;

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        const task = await response.json();
        setTasks([...tasks, task]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al crear tarea:", error);
      return false;
    }
  };

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

  const updateTask = async (id, newTitle) => {
    if (!newTitle.trim()) return false;

    try {
      const task = tasks.find((t) => t.id === id);
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          completed: task.completed,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      return false;
    }
  };

  //DELETE
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

  if (loading) {
    return <div className="loading">Cargando tareas...</div>;
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <main className="">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-300 p-6">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Lista de Tareas
            </h1>
            <p className="text-gray-600">
              {completedTasks} de {totalTasks} tareas completadas
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </header>
          <div>
            <TaskForm onCreateTask={createTask} />
          </div>

          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />

          <Footer />
        </div>
      </div>
    </main>
  );
}

export default App;
