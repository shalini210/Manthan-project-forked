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
        const data = { user_id, question, questiontitle };

        await axios.post(API_URL + "/userquestion", data)
            .then((d) => {
                setmsg("Question Asked to users.");
                dispatch(addQuestion(data)); // ✅ FIXED
                setQuestionList(prev => [data, ...prev]); // add new question to top
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div>
                <h1 className='font-bold text-3xl'>Question Title :- </h1>
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
                        .insert('Hello')
                        .insert('\n', { header: 1 })
                        .insert('Some ')
                        .insert('initial', { bold: true })
                        .insert(' ')
                        .insert('content', { underline: true })
                        .insert('\n')}
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
                        <div key={index} className='border p-3 my-2 rounded'>
                            <h3 className='font-semibold text-lg'>{q.questiontitle}</h3>
                        </div>
                    ))
                ) : (
                    <p>No questions yet.</p>
                )}
            </div>
        </>
    );
}
