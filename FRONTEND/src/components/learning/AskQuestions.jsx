import React, { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import Quill from 'quill';
import './forrte.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../Config';
import { addQuestion } from '../../slices/UserquestionSlice'; // ✅ FIXED

const Delta = Quill.import('delta');

export default function AskQuestions() {
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);
    const quillRef = useRef();
    const titleref = useRef("");
    const [msg, setmsg] = useState('');
    const user_id = useSelector((store) => store.user.userdata._id);
    const username = useSelector((store) => store.user.userdata.name);
    const dispatch = useDispatch();

    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let res = await axios.get(API_URL + "/userquestion/" + user_id);
                setQuestionList(res.data.data); // store question list
            } catch (err) {
                console.log("Error loading questions", err);
            }
        };
        fetchQuestions();
    }, [user_id]);

    const Showdata = async () => {
        const questiontitle = titleref.current.value;
        const question = quillRef.current.container.innerHTML;
        const data = { user_id, username, question, questiontitle };

        await axios.post(API_URL + "/userquestion", data)
            .then((d) => {
                setmsg("Question Asked to users.");
                // dispatch(addQuestion(data));
                dispatch(addQuestion(d.data.data));
                setQuestionList(prev => [d.data.data, ...prev]);
                // setQuestionList(prev => [data, ...prev]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div>
                <h1 className='font-bold text-2xl'>Question Title :- </h1>
                <input
                    type="text"
                    ref={titleref}
                    className='border w-full my-3 p-2 rounded outline-none focus:ring-2 focus:ring-blue-400'
                    placeholder="Enter your question title"
                />
            </div>

            <div>
                <Editor
                    ref={quillRef}
                    readOnly={readOnly}
                    defaultValue={new Delta()
                        .insert('\n', { header: 1 })
                    }
                    onSelectionChange={setRange}
                    onTextChange={setLastChange}
                />

                <div className="controls">
                    <label>
                        Read Only:{' '}
                        <input
                            type="checkbox"
                            value={readOnly}
                            onChange={(e) => setReadOnly(e.target.checked)}
                        />
                    </label>
                    <button
                        className="controls-right"
                        type="button"
                        onClick={() => {
                            alert(quillRef.current?.getLength());
                        }}
                    >
                        Get Content Length
                    </button>
                </div>

                <div className='text-center content-center text-xl font-bold uppercase border mt-4 rounded-xl bg-green-500 text-white w-full mx-auto'>
                    {msg}
                </div>

                <button
                    onClick={Showdata}
                    className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Submit Question
                </button>
            </div>

            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-2'>Your Questions</h2>
                {questionList.length > 0 ? (
                    questionList.map((q, index) => (
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full p-4 mb-3 bg-white shadow-md rounded-2xl hover:bg-gray-50 transition-all duration-200"
                            key={index}
                        >
                            
                            <div className="text-sm text-gray-600 mb-1 sm:mb-0 sm:w-1/5 font-medium truncate">
                                👤 {q.username || "Unknown"}
                            </div>

                            <div className="text-base sm:text-lg font-semibold text-gray-800 sm:w-3/5 text-wrap break-words">
                                ❓ {q.questiontitle}
                            </div>

                            <div className="text-sm text-gray-500 mt-2 sm:mt-0 sm:w-1/5 sm:text-end">
                                🕒 {new Date(q.postdate).toLocaleString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No questions yet.</p>
                )}
            </div>
        </>
    );
}
