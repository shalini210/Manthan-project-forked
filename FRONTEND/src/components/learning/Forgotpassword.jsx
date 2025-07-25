import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../Config';

export default function Forgotpassword() {
  const emailRef = useRef();
  const [success, setSuccess] = useState('');
  const [error, seterror] = useState('');
  const fun1 = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter your email");
      return;
    }
    else {
      let data = {
        useremail: email
      }
      axios.put(API_URL + "/user/forgetpassword", data)
        .then((d) => {
          if (d.data.msg === "OTP sent to registered email.") {
            setSuccess('OTP sent to your email for verification.');
            seterror('');
          } else {
            seterror('Email is not present');
            setSuccess('');
          }
        })

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            ref={emailRef}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your registered email"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <button
          type="button"
          onClick={() => fun1()}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
