"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Button from "@/components/Button";
import { Main } from "@/components/Main";
import { toast } from "react-hot-toast";

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
      toast.success("Successfully Deleted!");
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      toast.error("Failed to delete task");
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
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
            <Button onClick={handleNew} variant="primary" size="md">
              Create New Task
            </Button>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4">{task.description}</td>
                    <td className="px-6 py-4">{task.status}</td>
                    <td className="px-6 py-4">{task.priority}</td>
                    <td className="px-6 py-4">
                      {new Date(task.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
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
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-gray-500"
                    >
                      No tasks available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default TasksPage;
