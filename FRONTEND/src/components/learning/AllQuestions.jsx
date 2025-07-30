import React, { useEffect, useState } from 'react'
import { API_URL } from '../../Config'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllQuestions } from '../../slices/Allquestions'
export default  function AllQuestions() {
    let url = API_URL + "/Allquestions"
    let dispatch = useDispatch();

    let AllQuestions = [];
    const [AllQuestionsUI,setAllQuestionsUI]=useState("asd")
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let d = await axios.get(url);
                console.log(d.data.data)
                AllQuestions = d.data.data
                let ui = AllQuestions.map((ques,index)=>
                {
                return <div key={index}>
                    {ques.questiontitle}
                </div>
                })
                setAllQuestionsUI(ui)
                dispatch(setAllQuestions(d.data.data)) // store question list
            } catch (err) {
                console.log("Error loading questions", err);
            }
        };
        fetchQuestions();
},[]);

    return (
        <>
        <div>AllQuestions</div>
        {AllQuestionsUI}
        </>
    )
}
