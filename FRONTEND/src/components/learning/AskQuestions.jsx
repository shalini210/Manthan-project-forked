import React, { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import Quill from 'quill';
import './forrte.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../Config';
import { addQuestion } from '../../slices/UserquestionSlice';
import { Link } from 'react-router-dom';

const Delta = Quill.import('delta');

export default function AskQuestions() {
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);
    const quillRef = useRef();
    const titleref = useRef("");
    const categoryref = useRef();
    const [msg, setmsg] = useState(true);
    const user_id = useSelector((store) => store.user.userdata._id);
    const dispatch = useDispatch();
    const [currentEditId, setCurrentEditId] = useState('');
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let res = await axios.get(API_URL + "/userquestion/" + user_id);
                setQuestionList(res.data.data);
            } catch (err) {
                console.log("Error loading questions", err);
            }
        };
        fetchQuestions();
    }, [user_id]);

    const Showdata = async () => {
        const questiontitle = titleref.current.value;
        const question = quillRef.current.container.innerHTML;
        const category = categoryref.current.value;
        const data = { user_id, question, questiontitle, category };

        await axios.post(API_URL + "/userquestion", data)
            .then((d) => {
                setmsg("Question Asked to users.");
                setTimeout(() => setmsg(false), 5000)
                dispatch(addQuestion(d.data.data));
                setQuestionList(prev => [d.data.data, ...prev]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const UpdateData = async (id) => {
        const question = quillRef.current.container.innerHTML;
        const category = categoryref.current.value;
        const data = { question, category }
        await axios.put(`${API_URL}/userquestion/${id}`, data)
            .then((d) => {
                console.log("Updated:", d.data);
                setQuestionList((prev) =>
                    prev.map((q) => q._id === id ? { ...q, question, category } : q)
                );
                resetForm();
            })
            .catch((err) => {
                console.log("Error updating question:", err);
            })
    }

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/userquestion/${id}`)
            .then((d) => {
                console.log("Deleted:", d.data);
                setQuestionList((s) => s.filter((i) => i._id !== id));
            })
            .catch((err) => {
                console.log("Error deleting question:", err);
            })
    }

    const handleEdit = async (question) => {
        titleref.current.value = question.questiontitle;
        titleref.current.disabled = true;
        quillRef.current.container.innerHTML = question.question;
        categoryref.current.value = question.category;
        setCurrentEditId(question._id);
    }

    const resetForm = () => {
        setCurrentEditId("");
        titleref.current.disabled = false;
        titleref.current.value = "";
        quillRef.current.container.innerHTML = "";
        categoryref.current.value = "";
    }

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
            <div className='flex flex-col gap-2'>
                <h1 className='font-medium text-xl'>Select Category :- </h1>
                <select className="p-2 mb-3 w-fit border rounded" ref={categoryref}>
                    <option value="">Select Category</option>
                    <option value="general">General Discussion</option>
                    <option value="technology">Technology</option>
                    <option value="programming">Programming</option>
                    <option value="gaming">Gaming</option>
                    <option value="education">Education</option>
                    <option value="health">Health & Fitness</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="news">News & Current Events</option>
                    <option value="career">Career & Jobs</option>
                    <option value="feedback">Site Feedback</option>
                </select>
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

                <div className='text-center content-center text-xl font-bold uppercase border mt-4 rounded-xl bg-green-500 text-white w-full mx-auto'>
                    {msg}
                </div>

                <div className='flex mt-3 gap-5'>
                    {currentEditId ? (
                        <>
                            <button
                                onClick={() => UpdateData(currentEditId)}
                                className='mt-4 bg-emerald-500 text-white px-4 py-2 rounded'
                            >
                                Update Question
                            </button>
                            <button
                                onClick={resetForm}
                                className='mt-4 bg-gray-500 text-white px-4 py-2 rounded'
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={Showdata}
                            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                        >
                            Submit Question
                        </button>
                    )}
                </div>
            </div>

            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-2'>Your Questions</h2>
                {questionList.length > 0 ? (
                    questionList.map((ques, index) => (
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full p-4 mb-3 bg-white shadow-md rounded-2xl hover:bg-gray-50 transition-all duration-200"
                            key={index}
                        >

                            <Link
                                to={`/Questions_details/${ques._id}`} className="text-base sm:text-lg font-semibold text-gray-800 sm:w-2/5 text-wrap break-words mb-2 sm:mb-0 uppercase">
                                ❓ {ques.questiontitle}
                            </Link>

                            <div className="text-sm text-gray-500 sm:w-1/5 text-end">
                                🕒 {new Date(ques.postdate).toLocaleString()}
                            </div>

                            <div className="sm:w-1/5 text-end mt-2 sm:mt-0">
                                <button
                                    onClick={() => handleEdit(ques)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    ✏️ Edit
                                </button>
                            </div>

                            <div className="sm:w-1/5 text-end mt-2 sm:mt-0">
                                <button
                                    onClick={() => handleDelete(ques._id)}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    🗑️ Delete
                                </button>
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
