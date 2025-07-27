// import React from 'react'

// export default function AskQuestions() {
//   return (
//     <div>AskQuestions</div>
//   )
// }

import React, { useRef, useState } from 'react';
import Editor from './Editor';
import Quill from "quill"
import "./forrte.css"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../Config';
const Delta = Quill.import('delta');

export default function AskQuestions() {
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);
    const dref = useRef()
    const quillRef = useRef();
    const [msg, setmsg] = useState('');
    let email = useSelector((store) => store.user.userdata.email)
    const Showdata = async () => {
        // console.log(quillRef.current.container.innerHTML)
        // dref.current.innerHTML = quillRef.current.container.innerHTML
        // let question = dref.current.innerHTML;
        let question = quillRef.current.container.innerHTML
        let data = { email: email, question: question }
        await axios.post(API_URL + "/userquestion", data)
            .then((d) => {
                d.data.msg = "Question Asked to users."
                setmsg(d.data.msg);
            })
            .catch((err) => {
                data = err;
                console.log(data)
            })
        console.log(data);
    }
    return (
        <>
            {/* <div ref={dref} className='w-full h-auto'>

            </div> */}


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
                {/* <div className="state">
                    <div className="state-title">Current Range:</div>
                    {range ? JSON.stringify(range) : 'Empty'}
                </div>
                <div className="state">
                    <div className="state-title">Last Change:</div>
                    {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
                </div> */}

                <div className='text-center content-center text-xl font-bold uppercase border mt-4 rounded-xl bg-green-500 text-white w-full mx-auto'>{msg}</div>
            </div>


            <input type="button" value="SHow " onClick={() => Showdata()} />
        </>);
};
