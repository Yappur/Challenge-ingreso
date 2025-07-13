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
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Agregar nueva tarea..."
          className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg border-2 shadow-md border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-gray-900 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:from-blue-500 hover:to-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:scale-105 sm:hover:scale-109 shadow-lg hover:shadow-xl cursor-pointer min-w-[120px] sm:min-w-[140px]"
        >
          <Plus className="w-5 h-5" />
          {isSubmitting ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
