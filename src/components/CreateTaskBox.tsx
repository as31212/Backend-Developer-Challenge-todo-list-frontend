import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import { useSelector } from "react-redux";
import { storeInterface } from "../interfaces/storeInterface";

const CreateTaskBox:React.FC = ()=>{
  
  const {loading,error,createTask} = useCreateTask();
  const [task,setTask] = useState<string>("");
  const userData = useSelector((state:storeInterface)=>state.userData);

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setTask(e.target.value);
  }

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    createTask("http://localhost:8881/task/add",userData.id,userData.token,task);
    setTask("");
  }

    return(
        <>
        <form onSubmit={handleSubmit} className="p-6 border-b border-gray-200">
          <div className="flex">
            <input
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="task"
              value={task}
              onChange={handleChange}
              placeholder="What needs to be done?"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-200">
              Add
            </button>
            <p className="text-red-400">{error}</p>
          </div>
        </form>
        </>
    );
}

export default CreateTaskBox;