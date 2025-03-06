import React from "react";
import TaskItem from "./TaskItem";
import { CompletedTasksProps } from "../types/completedTask.types";

const CompletedTasks: React.FC<CompletedTasksProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="mb-5">
      <h3 className="text-sm my-3 font-bold">Completed Task</h3>

      {tasks.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          No tasks available.
        </p>
      )}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          createdAt={task.created_at}
          onToggleComplete={() => onToggleComplete(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task.id, task.title)}
          isCompleted={task.is_completed}
        />
      ))}
    </div>
  );
};

export default CompletedTasks;
