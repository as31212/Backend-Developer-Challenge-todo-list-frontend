import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/tasksSlice";

export const useCreateTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const createTask = async (url: string, userId: string, token: string, title: string) => {
    setLoading(true);
    try {
      const request = await fetch(`${url}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({title})
      });

      const results = await request.json();

      if (request.ok) {
        console.log(results);
        
        dispatch(addTask(results.task));
        console.log("Tasks fetched successfully");
        setError(null);
      } else {
        setError(results.message);
        console.log(results.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.log("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createTask, error };
};
