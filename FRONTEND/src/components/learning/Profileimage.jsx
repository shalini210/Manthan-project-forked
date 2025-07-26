import axios from 'axios';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../Config';
import { loginuserMain } from '../../slices/Userslice';

export default function Profileimage() {
    const imageref = useRef();
    const email = useSelector((store) => store.user.userdata.email)
    const imgurl = useSelector((store)=>store.user.userdata.profilepic)
    const [message, setmessage] = useState('')
    let iref = useRef()
    let dispatch = useDispatch()
    const fun1 = async () => {
        let data = { email: email, userimg: imageref.current.files[0] };

        await axios.post(API_URL + "/user/setimage", data, { headers: { "Content-Type": "multipart/form-data" } })
            .then((d) => {
                setmessage("Image Saved")
                  dispatch(loginuserMain(d.data.data))
                iref.current.src =API_URL+ d.data.data.profilepic
                console.log(API_URL+ d.data.data.profilepic)
            })
            .catch((err) => {
                console.log(err)
                setmessage("Something went wrong")
            })
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                <img src={API_URL+imgurl} ref={iref}></img>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                    🖼️ Profile Image
                </label>
                <input
                    type="file"
                    ref={imageref}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                />
                <button
                    onClick={() => fun1()}
                    className="bg-blue-600 w-full hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl mt-2 transition duration-300"
                >
                    Update
                </button>

                {message && (
                    <div className="text-center text-green-600 font-semibold mt-2">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
