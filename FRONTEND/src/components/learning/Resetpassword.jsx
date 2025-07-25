import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Config';

export default function ResetPassword() {
    const { id } = useParams();
    const otpRef = useRef();
    const passRef = useRef();
    const confirmRef = useRef();
    const [message, setMessage] = useState('');

    const handleReset = () => {
        const otp = otpRef.current.value;
        const password = passRef.current.value;
        const confirmPassword = confirmRef.current.value;

        if (!otp || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        axios.put(`${API_URL}/user/resetpwd`, {
            id,
            otp,
            password
        })
            .then((d) => {
                setMessage(d.data.msg || "Password reset successful.");
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong.");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Enter OTP</label>
                    <input
                        ref={otpRef}
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">New Password</label>
                    <input
                        ref={passRef}
                        type="password"
                        placeholder="New Password"
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Confirm Password</label>
                    <input
                        ref={confirmRef}
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {message && <p className="text-green-600 mb-2">{message}</p>}

                <button
                    onClick={handleReset}
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}
