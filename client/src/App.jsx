import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import "./index.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  //Filtro
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //GET
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

  const openDeleteModal = (id) => {
    setSelectedTask(id);
    setDeleteModal(true);
  };

  const onSucces = () =>
    toast("Accion realizada con éxito", {
      icon: <FaRegCheckCircle className="h-7 w-7 text-[#ffffff] " />,
      position: "top-right",
      style: {
        borderRadius: "10px",
        fontSize: "20px",
        background: "#94BCEB",
        color: "#0052B0",
      },
    });

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
        onSucces();
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
        onSucces();
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
        setDeleteModal(false);
        onSucces();
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <div className="loading">Cargando tareas...</div>;
  }

  const completedTasks = filteredTasks.filter((task) => task.completed).length;
  const totalFilteredTasks = filteredTasks.length;
  const totalTasks = tasks.length;

  return (
    <main className="">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-300 p-6">
        <div className="max-w-2xl mx-auto mt-8">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-gray-900 bg-clip-text text-transparent mb-3">
              Lista de Tareas{" "}
              <HiOutlineClipboardDocument className="inline-block text-[#0e0a5c] mb-2.5" />
            </h1>
            <p className="text-gray-600">
              {searchTerm ? (
                <>
                  {completedTasks} de {totalFilteredTasks} tareas completadas
                  (filtradas de {totalTasks} tareas)
                </>
              ) : (
                <>
                  {completedTasks} de {totalTasks} tareas completadas
                </>
              )}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-gray-900 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalFilteredTasks > 0
                      ? (completedTasks / totalFilteredTasks) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </header>

          <div>
            <TaskForm onCreateTask={createTask} />
          </div>
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onUpdateTask={updateTask}
            onDeleteTask={openDeleteModal}
          />

          <Footer />
        </div>
      </div>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        accionPrimaria={() => deleteTask(selectedTask)}
        tipo="delete"
        titulo="Eliminar Tarea"
        mensaje={`¿Estás seguro de que deseas eliminar la tarea?`}
        btnPrimario="Eliminar"
        btnSecundario="Cancelar"
      />
      <Toaster />
    </main>
  );
}

export default App;
