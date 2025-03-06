import axios from "axios";
import { Task } from "../types/taskList.types";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined in the environment variables.");
}

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks. Please try again later.");
  }
};

export const addTask = async (title: string): Promise<Task> => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, { title });
    return response.data.task;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task. Please try again later.");
  }
};

export const updateTask = async (
  taskId: number,
  updates: Partial<Task>
): Promise<Task> => {
  try {
    const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, updates);
    return response.data.task;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task. Please try again later.");
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task. Please try again later.");
  }
};
