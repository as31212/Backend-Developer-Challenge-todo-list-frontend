import { FaRegEdit } from "react-icons/fa";

interface EditTaskButtonProps{
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditTaskButton:React.FC<EditTaskButtonProps> = ({setEdit})=>{
    return(
        <>
        <FaRegEdit onClick={()=>setEdit((prevData)=>!prevData)} className="text-blue-500 hover:text-blue-700" />
        </>
    );
}