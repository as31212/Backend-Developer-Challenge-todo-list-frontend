import { useDispatch, useSelector } from "react-redux";
import { storeInterface } from "../interfaces/storeInterface";
import { useEffect } from "react";
import { login } from "../redux/slices/userDataSlice";

export const useRetrieveData = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state:storeInterface) => state.userData);
    
    useEffect(()=>{
        console.log(userData);
    },[userData]);
    
    const retrieveUser = () => {
        try {
            const localUserData = localStorage.getItem("userData");
            if (localUserData) {
                const parsedData = JSON.parse(localUserData);
                console.log(parsedData);
                dispatch(login(parsedData));
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
            localStorage.removeItem("userData");
        }
    };

    return { retrieveUser };
};