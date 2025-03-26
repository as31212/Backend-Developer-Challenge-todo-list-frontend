import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginFormDataInterface } from "../interfaces/loginFormDataInterface";
import { login,logout } from "../redux/slices/userDataSlice";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async (url: string, userData: loginFormDataInterface) => {
    setLoading(true);
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
        console.log("Login successful");
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

  const logOutUser = ()=>{
    localStorage.removeItem("userData");
    dispatch(logout());
    navigate("/");
  }

  return { loginUser,logOutUser, loading, error };
};
