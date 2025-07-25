import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slices/CounterSlice"
import demouserReducer from "./slices/DemouserSlice"
import userReducer from "./slices/Userslice"
export const store = configureStore({
    reducer:
    {
        counter:counterReducer,
        demouser:demouserReducer,
        user:userReducer
    }
})