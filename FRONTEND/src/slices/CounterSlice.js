import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count: 0,
    username: 'john'
}

export const counterSlice = createSlice(
    {
        name: 'counter',
        initialState,
        reducers: {
            increment: (state) => {
                state.count++;
            },
            decrement: (state) => {
                state.count--;
            },
            incrementByvalue: (state, payload) => {
                state.count += parseInt(payload.payload)
            },
            setUserName: (state, payload) => {
                console.log(payload)
                state.username= payload.payload.username
            },
            IncreaseValueEnteredByUser:(state,payload)=>
            {
                console.log(payload)
                state.count+=parseInt(payload.payload)
            },
            DecreaseValueEnteredByUser:(state,value)=>
            {
                console.log(value)
                state.count-=parseInt(value.payload)
            }
        }
    }
)
export const { increment, decrement, incrementByvalue,setUserName,IncreaseValueEnteredByUser,DecreaseValueEnteredByUser } = counterSlice.actions;
export default counterSlice.reducer