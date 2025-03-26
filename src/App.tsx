import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import { useRetrieveData } from "./hooks/useRetrieveData";
import { useEffect } from "react";

function App() {

  const {retrieveUser} = useRetrieveData();

  useEffect(()=>{
    retrieveUser();
  },[]);
 


  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
