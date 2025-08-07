import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginuserMain } from '../../slices/Userslice';
import { API_URL } from '../../Config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function UserLogin() {
    const emailref = useRef();
    const passref = useRef();
    let navigate = useNavigate()
    const dispatch = useDispatch();
    const setlogin = () => {
        const useremail = emailref.current.value;
        const password = passref.current.value;

        if (!useremail) {
            alert("Enter Email")
        }
        else if (!password) {
            alert("Password Required")
        }
        else {
            console.log("Logging in...");
            let data = { email: emailref.current.value.toLowerCase(), password: passref.current.value }
            axios.post(API_URL + "/user/loginUser", data)
                .then((d) => {
                    if (d.data.msg == "success") {
                        console.log(d.data.data)
                        dispatch(loginuserMain(d.data.data))
                        navigate("/")
                    }
                    else {
                        alert(d.data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("unexpected error , please try again ")
                })
            emailref.current.value = "";
            passref.current.value = "";
        }
    };

    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            ref={emailref}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            ref={passref}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='grid grid-cols-2  items-center'>
                        <button
                            onClick={setlogin}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Login
                        </button>
                        <Link to="/forgotpassword" className='w-full  text-right text-gray-700 hover:text-gray-500'>Forgetpassword?</Link>
                    </div>
                </div>
            </div>

        </>
    );
}
