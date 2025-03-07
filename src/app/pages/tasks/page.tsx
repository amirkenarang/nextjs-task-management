"use client";
import { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";

interface Task {
  id: number;
  title: string;
  description: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
