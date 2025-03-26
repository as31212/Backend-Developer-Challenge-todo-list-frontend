import { taskInterface } from "./taskInterface";
import { userDataInterface } from "./userDataInterface";


export interface storeInterface{
    userData: userDataInterface,
    tasks: taskInterface[],
    
}