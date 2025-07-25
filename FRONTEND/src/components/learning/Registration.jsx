import React, { useRef, useState } from 'react';
import { API_URL } from '../../Config';
import axios  from "axios"
import { Link } from 'react-router-dom';
export default function RegistrationForm() {
    const name = useRef();
    const email = useRef();
    const contact = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const address = useRef();
    const [error, setError] = useState('');
    const [msg,setmsg] = useState('');

    const handleSubmit =async (e) => {
        e.preventDefault();
        const checkpassword = password.current.value;
        const checkconfirmPassword = confirmPassword.current.value;

        if (checkpassword !== checkconfirmPassword) {
            setError("Passwords do not match!");
        } else {
            setError("registration successfull!")
            let user = 
            { name: name.current.value,
                 address: address.current.value,
                  email: email.current.value, 
                  password: password.current.value,
                   contact:contact.current.value }
                   console.log(user)
                   
//                    axios({
//   method: "post",
//   url: "myurl",
//   data: formData,
//   headers: {
//       'Content-Type':  `multipart/form-data`,
// })

           await  axios.post(API_URL+"/user",user)
            .then((d)=>
            {
           
                setError(<Link to="/login" className="hover:text-gray-200">{d.data.msg } Click here to login</Link>  )
            
            })
            .catch((err)=>
            {
                console.log(err)
            })
            // e.target.reset();
            // 
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    placeholder="Name"
                    ref={name}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    placeholder="Email"
                    ref={email}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    placeholder="Contact"
                    ref={contact}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    ref={password}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="password"
                    placeholder="Confirm Password"
                    ref={confirmPassword}
                    required
                />
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Address"
                    ref={address}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Register
                </button>
                {error}
            </form>
        </div>
    );
}
