import React, { useEffect, useState } from 'react'
import { API_URL } from '../../Config'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllQuestions } from '../../slices/Allquestions'
import { Link } from 'react-router-dom'
import CategorySection from '../learning/CategorySection'

export default function AllQuestions() {
    let url = API_URL + "/Allquestions"
    let dispatch = useDispatch();
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
                                className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center  p-4 mb-3 bg-white shadow-md rounded-2xl hover:bg-gray-50 transition-all duration-200"
                            >
                                <div className="text-base sm:text-lg font-semibold text-gray-800 sm:w-2/5 text-wrap break-words mb-2 sm:mb-0 uppercase">
                                    ❓ {ques.questiontitle}
                                </div>

                                <div className="sm:w-[50px] sm:h-[50px] mb-2 sm:mb-0 rounded-full overflow-hidden">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={API_URL + ques.profilepic}
                                        alt="Profile"
                                    />
                                </div>

                                <div className="text-sm text-gray-600 sm:w-1/5 font-medium truncate text-center sm:text-left mb-1 sm:mb-0">
                                    👤 {ques.user_name || "Unknown"}
                                </div>

                                <div className="text-sm text-gray-500 sm:w-1/5 text-end">
                                    🕒 {new Date(ques.postdate).toLocaleString()}
                                </div>
                            </div>
                        </Link>
                    );
                });

                setAllQuestionsUI(ui)
                dispatch(setAllQuestions(d.data.data))
            } catch (err) {
                console.log("Error loading questions", err);
            }
        };
        fetchQuestions();
    }, []);

    const fetchQuestionsByCategory = async (category) => {
        try {
            const res = await axios.get(`${API_URL}/userquestion/by-category/${category}`);
            const questions = res.data.data;

            if (!questions.length) {
                setAllQuestionsUI(<p className="text-gray-500">No questions found in this category.</p>);
                return;
            }

            let ui = questions.map((ques, index) => (
                <Link to={`/Questions_details/${ques._id}`} key={index}>
                    <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 mb-3 bg-white shadow-md rounded-2xl hover:bg-gray-50 transition-all duration-200">
                        <div className="text-base sm:text-lg font-semibold text-gray-800 sm:w-2/5 text-wrap break-words mb-2 sm:mb-0 uppercase">
                            ❓ {ques.questiontitle}
                        </div>
                        <div className="sm:w-[50px] sm:h-[50px] mb-2 sm:mb-0 rounded-full overflow-hidden">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={API_URL + ques.profilepic}
                                alt="Profile"
                            />
                        </div>
                        <div className="text-sm text-gray-600 sm:w-1/5 font-medium truncate text-center sm:text-left mb-1 sm:mb-0">
                            👤 {ques.user_name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500 sm:w-1/5 text-end">
                            🕒 {new Date(ques.postdate).toLocaleString()}
                        </div>
                    </div>
                </Link>
            ));

            setAllQuestionsUI(ui);
        } catch (err) {
            console.error("Error fetching questions by category", err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
           
            <div className="w-64 bg-white border-r shadow-md">
                <CategorySection onCategoryClick={fetchQuestionsByCategory} />
            </div>


            <div className="flex-1 p-6 min-h-screen bg-gray-50">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">All Questions</h1>
                <div className="w-full">{AllQuestionsUI}</div>
            </div>
        </div>
    )
}
