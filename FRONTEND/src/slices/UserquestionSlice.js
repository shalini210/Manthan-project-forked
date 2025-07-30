import { createSlice } from '@reduxjs/toolkit';

const userquestionSlice = createSlice({
    name: 'userquestion',
    initialState: {
        questions: []
    },
    reducers: {
        // setQuestions: (state, action) => {
        //     state.questions = action.payload;
        // },
        addQuestion: (state, action) => {
            state.questions.push(action.payload);
        }
    }
});

export const { setQuestions, addQuestion } = userquestionSlice.actions;
export default userquestionSlice.reducer;
