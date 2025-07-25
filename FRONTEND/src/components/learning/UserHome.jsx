import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutuserMain } from '../../slices/Userslice';
import UserLogin from './UserLogin';

export default function UserHome() {
    const dispatch = useDispatch();
    let userislogin = useSelector((store) => store.user.userislogin)
    let fun1 = () => {
        console.log("Logout...")
        dispatch(logoutuserMain())
    }
    return (
        <>
            {(userislogin) ?
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Are you sure you want to log out?</h2>
                        <button
                            onClick={() => fun1()}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                : <UserLogin></UserLogin>}
        </>

    )
}
