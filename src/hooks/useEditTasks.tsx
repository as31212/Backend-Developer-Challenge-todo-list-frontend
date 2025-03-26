
import { useState } from "react";
import { useDispatch } from "react-redux";
import { req } from "../redux/slices/userDataSlice";

export const useEditTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const editTask = async (url: string, taskId: string, token: string, title:string) => {
    setLoading(true);
    try {
      const request = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({taskId,title}),
      });
      

      const results = await request.json();

      if (request.ok) {
        dispatch(req());
        console.log("Task updated successfully");
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

  const editStatus = async (url: string, taskId: string, token: string, status:string) => {
    setLoading(true);
    try {
      const request = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({taskId,status}),
      });

      const results = await request.json();

      if (request.ok) {
        console.log(results);
        
        dispatch(req());
        console.log("Task status updated successfully");
        setError(null);
      }else{
        setError(results.message);
        console.log(results.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.log("An unexpected error occurred");
    }
  }


  return { editStatus,editTask, loading, error };
};
