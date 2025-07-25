import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API_URL } from '../../Config'
import { useSelector } from 'react-redux'

export default function Profile() {
    const email = useSelector((store) => store.user.userdata.email);
    const imageref = useRef()
    const nameref = useRef()
    const educationref = useRef()
    const facebookRef = useRef()
    const instagramRef = useRef()
    const twitterRef = useRef()
    const youtubeRef = useRef()
    const websiteRef = useRef()

    const [message, setmessage] = useState()

    const fun1 = async () => {
        let data = {
            name: nameref.current.value,
            education: educationref.current.value,
            userimg: imageref.current.files[0],
            email: email,
            facebook: facebookRef.current.value,
            instagram: instagramRef.current.value,
            twitter: twitterRef.current.value,
            youtube: youtubeRef.current.value,
            website: websiteRef.current.value
        }

        await axios.post(API_URL + '/user/setprofile', data, { headers: { "Content-Type": "multipart/form-data" } })
            .then(() => {
                setmessage("Saved")
            })
            .catch((err) => {
                console.log(err)
                setmessage("Something went wrong")
            })
    }

    return (
        <>
            <div className='w-full max-w-2xl mx-auto border rounded-2xl p-6 bg-white shadow-md'>
                <div className='text-center text-4xl font-bold mb-6 uppercase text-blue-600'>Profile</div>

                <div className='grid grid-cols-1 gap-4'>

                    <div>
                        <label className='block font-medium mb-1'>🖼️ Profile Image</label>
                        <input type="file" ref={imageref} className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>👤 Name</label>
                        <input type="text" ref={nameref} placeholder='Enter your name' className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>🎓 Education</label>
                        <input type="text" ref={educationref} placeholder='Your education' className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>📘 Facebook Link</label>
                        <input type="text" ref={facebookRef} placeholder='https://facebook.com/yourprofile' className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>📸 Instagram Link</label>
                        <input type="text" ref={instagramRef} placeholder='https://instagram.com/yourprofile' className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>🐦 Twitter Link</label>
                        <input type="text" ref={twitterRef} placeholder='https://twitter.com/yourprofile' className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>📺 YouTube Link</label>
                        <input type="text" ref={youtubeRef} placeholder='https://youtube.com/yourchannel' className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <div>
                        <label className='block font-medium mb-1'>🌐 Website</label>
                        <input type="text" ref={websiteRef} placeholder='https://yourwebsite.com' className='border rounded-xl w-full px-3 py-2' />
                    </div>

                    <button
                        onClick={() => fun1()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl mt-2 transition duration-300"
                    >
                        Save
                    </button>

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
