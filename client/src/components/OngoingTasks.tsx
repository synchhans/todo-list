import React from "react";
import TaskItem from "./TaskItem";
import { OngoingTasksProps } from "../types/ongoingTask.types";

const OngoingTasks: React.FC<OngoingTasksProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm mb-3 font-bold">Ongoing Task</h3>

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

export default OngoingTasks;
