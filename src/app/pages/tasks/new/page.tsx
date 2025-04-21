"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Main } from "@/components/Main";
import toast from "react-hot-toast";

const CreateTaskPage = () => {
  const router = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To-Do",
    priority: "Medium",
    due_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dueDateISO = new Date(newTask.due_date).toISOString();

    try {
      await apiClient.post("/tasks", {
        ...newTask,
        userId: 1, // TODO, get from user
        project_id: 1,
        due_date: dueDateISO,
      });
      toast.success("Task Created!");

      router.push("/pages/tasks");
    } catch (error) {
      toast.error("Failed to create task");

      console.error("Failed to create task:", error);
    }
  };

  return (
    <Main>
      <div className=" p-8">
        <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            label="Title"
          />
          <Input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            label="Description"
          />
          <Input
            type="text"
            placeholder="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            label="Status"
          />
          <Input
            type="text"
            placeholder="Priority"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            label="Priority"
          />
          <Input
            type="date"
            placeholder="Due Date"
            value={newTask.due_date}
            onChange={(e) =>
              setNewTask({ ...newTask, due_date: e.target.value })
            }
            label="Due Date"
          />
          <Button type="submit" variant="primary">
            Create Task
          </Button>
        </form>
      </div>
    </Main>
  );
};

export default CreateTaskPage;
