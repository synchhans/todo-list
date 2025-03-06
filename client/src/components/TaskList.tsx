import React from "react";
import AddTaskForm from "./AddTaskForm";
import OngoingTasks from "./OngoingTasks";
import CompletedTasks from "./CompletedTasks";
import { useTaskManager } from "../hooks/useTaskManager";

const TaskList: React.FC = () => {
  const {
    tasks,
    loading,
    error,
    editingTaskId,
    addTask,
    updateTask,
    startEdit,
    deleteTask,
    toggleComplete,
    cancelEdit,
    ongoingTasks,
    completedTasks,
  } = useTaskManager();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-lg font-semibold text-gray-700">
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-800">
              Oops! Something went wrong.
            </h2>
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl text-center my-2">Task Management</h1>

      <AddTaskForm
        onSubmit={(title) =>
          editingTaskId ? updateTask(editingTaskId, title) : addTask(title)
        }
        onCancel={cancelEdit}
        initialTitle={
          editingTaskId
            ? tasks.find((task) => task.id === editingTaskId)?.title
            : undefined
        }
      />

      <OngoingTasks
        tasks={ongoingTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={startEdit}
      />

      <CompletedTasks
        tasks={completedTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={startEdit}
      />
    </div>
  );
};

export default TaskList;
