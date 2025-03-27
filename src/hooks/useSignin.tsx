import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../redux/slices/userDataSlice";
import { signinFormDataInterface } from "../interfaces/signinFormDataInterface";

export const useSignin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signinUser = async (url: string, userData: signinFormDataInterface) => {
    setLoading(true);
    setError(null);
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const results = await request.json();

      if (request.ok) {
        console.log("Signin successful");
        console.log(results);
        localStorage.setItem("userData", JSON.stringify(results));
        console.log(localStorage.getItem("userData"));

        dispatch(login(results));
        navigate("/home");
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

  

  return { signinUser, loading, error };
};
