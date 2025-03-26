import { useState } from "react";
import { useDispatch } from "react-redux";
import { req } from "../redux/slices/userDataSlice";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const deleteTask = async (url: string, taskId: string, token: string) => {
    setLoading(true);
    try {
      const request = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({taskId}),
      });
      

      const results = await request.json();

      if (request.ok) {
        dispatch(req());
        console.log("Task deleted successfully");
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


  return { deleteTask, loading, error };
};
