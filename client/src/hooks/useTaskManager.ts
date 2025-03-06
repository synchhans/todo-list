import { useState, useEffect } from "react";
import { Task } from "../types/taskList.types";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export const useTaskManager = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const addTaskHandler = async (title: string) => {
    if (!title.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const newTask = await addTask(title);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateTaskHandler = async (id: number, title: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTask(id, { title });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      setEditingTaskId(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskHandler = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id: number) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    setLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTask(id, {
        is_completed: !taskToUpdate.is_completed,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (id: number) => {
    setEditingTaskId(id);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  const ongoingTasks = tasks
    .filter((task) => !task.is_completed)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));

  const completedTasks = tasks
    .filter((task) => task.is_completed)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  return {
    tasks,
    loading,
    error,
    editingTaskId,
    addTask: addTaskHandler,
    updateTask: updateTaskHandler,
    startEdit,
    deleteTask: deleteTaskHandler,
    toggleComplete,
    cancelEdit,
    ongoingTasks,
    completedTasks,
  };
};
