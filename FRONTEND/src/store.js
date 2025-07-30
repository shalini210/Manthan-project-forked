import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slices/CounterSlice"
import demouserReducer from "./slices/DemouserSlice"
import userReducer from "./slices/Userslice"
import userquestionReducer from "./slices/UserquestionSlice"
import allQuestionReducer from "./slices/Allquestions"
export const store = configureStore({
    reducer:
    {
        counter: counterReducer,
        demouser: demouserReducer,
        user: userReducer,
        userquestion: userquestionReducer,
        allquestions:allQuestionReducer
    }
})