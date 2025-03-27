import { RemoveTaskButton } from "./RemoveTaskButton";
import { taskInterface } from "../interfaces/taskInterface";
import { FaCheck } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";


import { useState } from "react";
import { EditTaskButton } from "./EditTaskButton";
import { useEditTask } from "../hooks/useEditTasks";
import { useSelector } from "react-redux";
import { storeInterface } from "../interfaces/storeInterface";

const Task: React.FC<taskInterface> = ({ title, status, _id }) => {
  const [edit, setEdit] = useState(false);
  const [stateStatus, setStateStatus] = useState<string>(status);
  const [formTitle, setFormTitle] = useState<string>(title);
  const { editTask, editStatus } = useEditTask();
  const userData = useSelector((state: storeInterface) => state.userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editTask("https://backend-developer-challenge-todo-backend.onrender.com/task/edit", _id, userData.token, formTitle);
    setEdit(false);
  };

  const handleStatusChange = () => {
    const newStatus = stateStatus === "complete" ? "incomplete" : "complete"; // Calculate the new status
    setStateStatus(newStatus); // Update the state
    editStatus(
      "https://backend-developer-challenge-todo-backend.onrender.com/task/status-change",
      _id,
      userData.token,
      newStatus
    ); // Send the new status to the API
  };

  return (
    <>
      <div
        key={_id}
        className="p-4 flex items-center justify-between hover:bg-gray-50"
      >
        <input
          defaultChecked={status === "complete" ? true : false}
          onClick={() => handleStatusChange()}
          type="checkbox"
          className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
        />
        {edit ? (
          <form className="flex gap-5" onSubmit={handleSubmit}>
            <input
              className="border-2 border-gray-100 p-2"
              onChange={handleChange}
              type="text"
              name="title"
              value={formTitle}
            />
            <div className="flex gap-2">
              <button type="submit" className="text-blue-500 hover:text-blue-700 text-2xl">
                <FaCheck />
              </button>
              <button onClick={() => setEdit(false)} className="text-red-500 hover:text-red-700 text-2xl">
                <FcCancel />
              </button>
            </div>
          </form>
        ) : (
          <label
            className={`${
              stateStatus === "complete" ? "line-through text-gray-400" : ""
            }`}
          >
            {title}
          </label>
        )}
        <div className="flex gap-2">
          <EditTaskButton setEdit={setEdit} />
          <RemoveTaskButton taskId={_id} />
        </div>
      </div>
    </>
  );
};

export default Task;
