import { createSlice } from "@reduxjs/toolkit";
import { userDataInterface } from "../../interfaces/userDataInterface";

const initialState: userDataInterface = {
    id:"",
    username: "",
    email: "",
    token: "",
    request:true,
}

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers:{
        login(state,action){
            state.id = action.payload.user.id;
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            state.token = action.payload.token;
        },
        logout(){
            return initialState
        },
        req(state){
            state.request = !state.request
        }
    }

})

export const {login,logout,req} = userDataSlice.actions;
export default userDataSlice.reducer;