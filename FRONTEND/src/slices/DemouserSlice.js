import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username:"",
    password:"",
    userislogin:false
}
export const DemouserSlice = createSlice({
  name:"DemouserSlice",
    initialState,
    reducers:
    {
        loginuser:(state,payload)=>
        {
            state.username =payload.payload.username
            state.password = parseInt(payload.payload.password)
            state.userislogin = true;
        },
        logoutuser:(state)=>
        {
            state.username=""
            state.userislogin =false
        }

    }

})
export const {loginuser,logoutuser} = DemouserSlice.actions;
export default DemouserSlice.reducer