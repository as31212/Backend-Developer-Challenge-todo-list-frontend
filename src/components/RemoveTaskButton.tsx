import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { storeInterface } from "../interfaces/storeInterface";
import { useDeleteTask } from "../hooks/useDeleteTask";

interface RemoveTaskButtonProps{
    taskId:string;
}

export const RemoveTaskButton:React.FC<RemoveTaskButtonProps> = ({taskId})=>{

    const {deleteTask,loading,error} = useDeleteTask();
    const userData = useSelector((state:storeInterface)=>state.userData);

    return(
        <>
        <FaRegTrashAlt onClick={()=>deleteTask("http://localhost:8881/task/delete",taskId,userData.token)} className="text-red-500 hover:text-red-700" />
        </>
    );
}