import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginuser } from '../../slices/DemouserSlice';

export default function Navbar() {
    let userislogin = useSelector((store) => store.user.userislogin)
    return (
        <>
            {(!userislogin) ?
                <nav className="bg-blue-600 text-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                        <div className="text-xl font-bold">MySite</div>
                        <div className="space-x-6 hidden md:flex">
                            <Link to="/" className="hover:text-gray-200">Home</Link>
                            <Link to="/allquestions" className="hover:text-gray-200">Questions/Answers</Link>
                            <Link to="/about" className="hover:text-gray-200">About Me</Link>
                            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
                            <Link to="/login" className="hover:text-gray-200">Login</Link>
                            <Link to="/registration" className="hover:text-gray-200">Registration</Link>
                        </div>
                    </div>
                </nav>
                :
                <nav className="bg-blue-600 text-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                        <div className="text-xl font-bold">MySite</div>
                        <div className="space-x-6 hidden md:flex">
                            <Link to="/" className="hover:text-gray-200">Home</Link>
                            <Link to="/allquestions" className="hover:text-gray-200">Questions/Answers</Link>
                            <Link to="/about" className="hover:text-gray-200">About Me</Link>
                            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
                            <Link to="/logout" className="hover:text-gray-200">Logout</Link>
                        </div>
                    </div>
                </nav>}
        </>
    );
}
