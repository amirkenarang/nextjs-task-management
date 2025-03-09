"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Main } from "@/components/Main";

const EditTaskPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    due_date: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiClient.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/tasks/${id}`, task);
      router.push("/pages/tasks");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <Main>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            label="Title"
          />
          <Input
            type="text"
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            label="Description"
          />
          <Input
            type="text"
            placeholder="Status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            label="Status"
          />
          <Input
            type="text"
            placeholder="Priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            label="Priority"
          />
          <Input
            type="date"
            placeholder="Due Date"
            value={task.due_date}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
            label="Due Date"
          />
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </Main>
  );
};

export default EditTaskPage;
