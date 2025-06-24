import { useState } from "react";
import { Check, Edit3, Trash2, X, Save } from "lucide-react";

const TaskItem = ({ task, onToggleComplete, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(task.title);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditingTitle(task.title);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = async () => {
    if (!editingTitle.trim()) return;

    const success = await onUpdateTask(task.id, editingTitle.trim());
    if (success) {
      setIsEditing(false);
    }
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="group relative cursor-pointer">
      {task.completed && (
        <div className="absolute -top-2 -right-2 z-10 animate-bounce">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
            ¡Completada! ✨
          </div>
        </div>
      )}

      <div
        className={`
        relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 ease-in-out
        ${
          task.completed
            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg shadow-green-100/50"
            : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50"
        }
        ${!task.completed && "hover:scale-[1.02] hover:-translate-y-1"}
        group-hover:shadow-2xl
      `}
      >
        <div
          className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12 -translate-x-full group-hover:translate-x-full ease-in-out
        `}
        />

        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <button
              onClick={() => onToggleComplete(task.id, task.completed)}
              className={`
                relative w-6 h-6 rounded-full border-2 transition-all duration-300 ease-in-out cursor-pointer
                ${
                  task.completed
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 shadow-lg shadow-green-200"
                    : "border-gray-300 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
              `}
            >
              {task.completed && (
                <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-in zoom-in duration-200 cursor-pointer" />
              )}
            </button>
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="w-full px-4 py-2 text-lg font-medium bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  autoFocus
                  placeholder="Escribe tu tarea..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    disabled={!editingTitle.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancelEditing}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3
                  className={`
                  text-lg font-semibold transition-all duration-300
                  ${
                    task.completed
                      ? "text-green-700 line-through opacity-75"
                      : "text-gray-800 group-hover:text-blue-700"
                  }
                `}
                >
                  {task.title}
                </h3>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={handleStartEditing}
                    className="flex items-center gap-2 px-3 py-1.5  text-amber-700 rounded-lg hover:bg-amber-200 transition-all duration-200 text-sm font-medium cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 text-sm font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
                  </button>
                  <div
                    className={`
                  text-lg font-semibold transition-all duration-300
                  ${
                    task.completed
                      ? "text-green-700 line-through opacity-75"
                      : "text-gray-800 group-hover:text-blue-700"
                  }
                `}
                  >
                    {formatDate(task.createdAt)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`
          absolute bottom-0 left-0 h-1 transition-all duration-500 ease-in-out
          ${
            task.completed
              ? "w-full bg-gradient-to-r from-green-400 to-emerald-500"
              : "w-0 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full"
          }
        `}
        />
      </div>
    </div>
  );
};

export default TaskItem;
