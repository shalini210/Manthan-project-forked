import axios from 'axios';
import React, { useRef, useState } from 'react';
import { API_URL } from '../../Config';
import { useDispatch } from 'react-redux';
import { loginuserMain } from '../../slices/Userslice';
import { useSelector } from 'react-redux';

export default function ChangePassword() {
    const passwordRef = useRef();
    const newPasswordRef = useRef();
    const reenterPasswordRef = useRef();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const user = useSelector((store) => store.user.userdata);
    console.log(user)
    const fun1 = () => {
        // const email =useSelector((st))
        const current = passwordRef.current.value;
        const newPass = newPasswordRef.current.value;
        const reenter = reenterPasswordRef.current.value;
        if (newPass !== reenter) {
            setError("new password do not match.")
        }
        else {
            setError("");
            let data = {
                email: user.email,
                currentpassword: current,
                newpassword: newPass
            };

            // .Changepassword({ email:req.body.email,oldpassword: req.body.currentpassword,newpassword:req.body.newpassword })
            axios.put(API_URL + "/user/changepwd", data)
                .then((d) => {
                    if (d.data.msg == "Password changed successfully!") {
                        setSuccess('Password changed successfully!');
                    }
                    else {
                        alert(d.data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("unexpected error , please try again ")
                })
            passwordRef.current.value = '';
            newPasswordRef.current.value = '';
            reenterPasswordRef.current.value = '';
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Current Password</label>
                    <input
                        type="password"
                        ref={passwordRef}
                        required
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        ref={newPasswordRef}
                        required
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Re-enter New Password</label>
                    <input
                        type="password"
                        ref={reenterPasswordRef}
                        required
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button
                    type="button"
                    onClick={() => fun1()}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}