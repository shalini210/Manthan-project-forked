import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
AllQuestionsData:[]
}

const Allquestions = createSlice({
  name: "Allquestions",
  initialState,
  reducers: {
    setAllQuestions:(state,payload)=>
    {
        state.AllQuestionsData = payload.payload
    }
  }
});

export const {setAllQuestions} = Allquestions.actions

export default Allquestions.reducer