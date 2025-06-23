import { useState } from "react";
import { Plus } from "lucide-react";

const TaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsSubmitting(true);

    try {
      const success = await onCreateTask(title.trim());
      if (success) {
        setTitle("");
      }
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Agregar nueva tarea..."
          className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
        />
        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          {isSubmitting ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
