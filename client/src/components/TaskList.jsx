import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleComplete, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
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
