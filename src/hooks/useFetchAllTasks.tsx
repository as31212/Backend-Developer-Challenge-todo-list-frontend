import { useState } from "react";
import { useDispatch } from "react-redux";
import { populate } from "../redux/slices/tasksSlice";

export const useFetchAllTasks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const fetchTasks = async (url: string, userId: string, token: string) => {
    setLoading(true);
    try {
      const request = await fetch(`${url}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const results = await request.json();

      if (request.ok) {
        console.log(results);
        
        dispatch(populate(results));
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

  return { loading, fetchTasks, error };
};
