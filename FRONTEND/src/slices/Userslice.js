import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userdata: {},
    userislogin: false
}
export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:
    {
        loginuserMain: (state, payload) => {

            state.userdata = payload.payload
            state.userislogin = true;
        },
        logoutuserMain: (state) => {
            state.userdata = {}
            state.userislogin = false
        }

    }

})
export const { loginuserMain, logoutuserMain } = userSlice.actions;
export default userSlice.reducer