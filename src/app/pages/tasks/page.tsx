"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Button from "@/components/Button";
import { Main } from "@/components/Main";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

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

  const handleDelete = async (taskId: number) => {
    try {
      await apiClient.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEdit = (taskId: number) => {
    router.push(`/pages/tasks/${taskId}`);
  };

  const handleNew = () => {
    router.push(`/pages/tasks/new`);
  };

  return (
    <Main>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Tasks</h1>
        <div className="mb-8">
          <Button onClick={() => handleNew()} variant="primary">
            Create New Task
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>{new Date(task.due_date).toLocaleDateString()}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(task.id)}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(task.id)}
                        variant="error"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Main>
  );
};

export default TasksPage;
