import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API_URL } from '../../Config'
import { useDispatch, useSelector } from 'react-redux'
import { loginuserMain } from '../../slices/Userslice';

export default function Profile() {
    const email = useSelector((store) => store.user.userdata.email);
    const username = useSelector((store) => store.user.userdata.name);
    const usereducation = useSelector((store) => store.user.userdata.education);
    const userfacebook = useSelector((store) => store.user.userdata.facebook)
    const userinstagram = useSelector((store) => store.user.userdata.instagram)
    const usertwitter = useSelector((store) => store.user.userdata.twitter)
    const useryoutube = useSelector((store) => store.user.userdata.youtube)
    const userwebsite = useSelector((store) => store.user.userdata.website)

    const nameref = useRef()
    const educationref = useRef()
    const facebookRef = useRef()
    const instagramRef = useRef()
    const twitterRef = useRef()
    const youtubeRef = useRef()
    const websiteRef = useRef()

    const [message, setmessage] = useState()
    const [enable, setenable] = useState(false)
    let dispatch = useDispatch()

    const fun1 = async () => {
        let data = {
            name: nameref.current.value,
            education: educationref.current.value,
            email: email,
            facebook: facebookRef.current.value,
            instagram: instagramRef.current.value,
            twitter: twitterRef.current.value,
            youtube: youtubeRef.current.value,
            website: websiteRef.current.value
        }

        await axios.post(API_URL + '/user/setprofile', data)
            .then((d) => {
                setmessage("Saved")
                dispatch(loginuserMain(d.data.data))
                setenable(false)
            })
            .catch((err) => {
                console.log(err)
                setmessage("Something went wrong")
            })
    }

    const handleCancel = () => {
        setenable(false)
        setmessage("")
    }

    return (
        <>
            <div className='w-full max-w-2xl mx-auto border rounded-2xl p-6 bg-white shadow-md'>
                <div className='text-center text-4xl font-bold mb-6 uppercase text-blue-600'>Profile</div>

                <div className='grid grid-cols-1 gap-4'>
                    <div>
                        <label className='block font-medium mb-1'>👤 Name</label>
                        <input type="text" ref={nameref} placeholder='Enter your name' value={username} className={`border rounded-xl w-full px-3 py-2 ${!enable ? 'opacity-60' : ''}`} disabled={!enable} />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>🎓 Education</label>
                        <input type="text" ref={educationref} placeholder='Your education' value={usereducation} className={`border rounded-xl w-full px-3 py-2 ${!enable ? 'opacity-60' : ''}`} disabled={!enable} />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>📘 Facebook Link</label>
                        <input type="text" ref={facebookRef} placeholder='https://facebook.com/yourprofile' value={userfacebook} className={`border rounded-xl w-full px-3 py-2 ${!enable ? 'opacity-60' : ''}`} disabled={!enable} />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>📸 Instagram Link</label>
                        <input type="text" ref={instagramRef} placeholder='https://instagram.com/yourprofile' value={userinstagram} className={`border rounded-xl w-full px-3 py-2 ${!enable ? 'opacity-60' : ''}`} disabled={!enable} />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>🐦 Twitter Link</label>
                        <input type="text" ref={twitterRef} placeholder='https://twitter.com/yourprofile' value={usertwitter} className={`border rounded-xl w-full px-3 py-2 ${!enable ? 'opacity-60' : ''}`} disabled={!enable} />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>📺 YouTube Link</label>
                        <input type="text" ref={youtubeRef} placeholder='https://youtube.com/yourchannel' value={useryoutube} className={`border rounded-xl w-full px-3 py-2 ${!enable ? 'opacity-60' : ''}`} disabled={!enable} />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>🌐 Website</label>
                        <input type="text" ref={websiteRef} placeholder='https://yourwebsite.com' value={userwebsite} className={`border rounded-xl w-full px-3 py-2 ${!enable ? 'opacity-60' : ''}`} disabled={!enable} />
                    </div>

                    {!enable ? (
                        <button
                            onClick={() => setenable(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl mt-2 transition duration-300"
                        >
                            Edit
                        </button>
                    ) : (
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={fun1}
                                className="bg-green-600 hover:bg-green-700 w-1/2 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-400 w-1/2 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    {message && (
                        <div className="text-center text-green-600 font-semibold mt-2">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
