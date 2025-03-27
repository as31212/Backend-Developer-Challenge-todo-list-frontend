import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { storeInterface } from "../interfaces/storeInterface";
import { useDeleteTask } from "../hooks/useDeleteTask";

interface RemoveTaskButtonProps {
  taskId: string;
}

export const RemoveTaskButton: React.FC<RemoveTaskButtonProps> = ({
  taskId,
}) => {
  const { deleteTask, loading, error } = useDeleteTask();
  const userData = useSelector((state: storeInterface) => state.userData);

  const handleDelete = () => {
    if (!loading) {
      deleteTask(
        "https://backend-developer-challenge-todo-backend.onrender.com/task/delete",
        taskId,
        userData.token
      );
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDelete}
        disabled={loading} 
        className={`text-red-500 hover:text-red-700 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaRegTrashAlt />
      </button>
      {error && <p className="text-red-400 text-sm ml-2">{error}</p>}{" "}
    </div>
  );
};
