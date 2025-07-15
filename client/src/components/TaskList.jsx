import TaskItem from "./TaskItem";
import { LuNotebookPen } from "react-icons/lu";

const TaskList = ({ tasks, onToggleComplete, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center flex flex-col py-8">
        <div className="flex justify-center items-center text-8xl mb-4">
          <LuNotebookPen className="animate-pulse text-[#0e0a5c]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No hay tareas
        </h3>
        <p className="text-gray-500">¡Agrega tu primera tarea para comenzar!</p>
      </div>
    );
  }

  return (
    <div className="tasks-list space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
