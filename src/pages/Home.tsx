import CreateTaskBox from "../components/CreateTaskBox";
import Task from "../components/Task";
import { useSelector } from "react-redux";
import { storeInterface } from "../interfaces/storeInterface";
import { useEffect } from "react";
import { useFetchAllTasks } from "../hooks/useFetchAllTasks";
import { useLogin } from "../hooks/useLogin";

const Home: React.FC = () => {
  const { loading, error, fetchTasks } = useFetchAllTasks();
  const {logOutUser} = useLogin();
  const userData = useSelector((state: storeInterface) => state.userData);
  const tasks = useSelector((state: storeInterface) => state.tasks);


  useEffect(() => {
    if (userData?.id && userData?.token) {
      fetchTasks(
        "https://backend-developer-challenge-todo-backend.onrender.com:8881/task/tasks",
        userData.id,
        userData.token
      );
    }
  }, [userData]);

  const taskArray = Array.isArray(tasks)
    ? tasks.map((el) => (
        <Task key={el._id} _id={el._id} status={el.status} title={el.title} />
      ))
    : [];

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{userData.username}'s Todo List</h1>
            <button className="text-white hover:underline" onClick={logOutUser}>Log out</button>
          </div>

          {/* Input Section */}
          <CreateTaskBox />

          {/* Todo List */}
          <div className="divide-y divide-gray-200">
            {tasks.length < 1 ? <h1>No tasks</h1> : taskArray}
            {error && <p className="text-red-400">{error}</p>}
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Home;
