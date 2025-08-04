import React, { useEffect, useState } from 'react'
import { API_URL } from '../../Config'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllQuestions } from '../../slices/Allquestions'
import { Link } from 'react-router-dom'
export default function AllQuestions() {
    let url = API_URL + "/Allquestions"
    let dispatch = useDispatch();
    // const username = useSelector((store) => store.user.userdata.name);
    // console.log(username)
    let AllQuestions = [];
    const [AllQuestionsUI, setAllQuestionsUI] = useState("asd")
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let d = await axios.get(url);
                console.log(d.data.data)
                AllQuestions = d.data.data
                let ui = AllQuestions.map((ques, index) => {
                    return (
                        <Link to={`/Questions_details/${ques._id}`} key={index}>

                            <div
                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full p-4 mb-3 bg-white shadow-md rounded-2xl hover:bg-gray-50 transition-all duration-200"
                            >
                                {/* Question Title */}
                                <div className="text-base sm:text-lg font-semibold text-gray-800 sm:w-2/5 text-wrap break-words mb-2 sm:mb-0">
                                    ❓ {ques.questiontitle}
                                </div>

                                {/* Profile Image */}
                                <div className="sm:w-[50px] sm:h-[50px] mb-2 sm:mb-0 rounded-full overflow-hidden">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={API_URL + ques.profilepic}
                                        alt="Profile"
                                    />
                                </div>

                                {/* Username */}
                                <div className="text-sm text-gray-600 sm:w-1/5 font-medium truncate text-center sm:text-left mb-1 sm:mb-0">
                                    👤 {ques.user_name || "Unknown"}
                                </div>

                                {/* Post Time */}
                                <div className="text-sm text-gray-500 sm:w-1/5 text-end">
                                    🕒 {new Date(ques.postdate).toLocaleString()}
                                </div>
                            </div>

                        </Link>
                    );
                });


                setAllQuestionsUI(ui)
                dispatch(setAllQuestions(d.data.data)) // store question list
            } catch (err) {
                console.log("Error loading questions", err);
            }
        };
        fetchQuestions();
    }, []);

    return (
        <>
            <div>AllQuestions</div>
            {AllQuestionsUI}
        </>
    )
}
