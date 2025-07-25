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
                setmessage("saved")
            })
            .catch((err) => {
                console.log(err)
                setmessage("something wentrong")
            })
    }

    return (
        <>
            <div className='w-100 mx-auto border rounded-2xl flex flex-wrap gap-4 p-3'>
                <div className='text-center w-full text-5xl uppercase font-bold'>Profile</div>

                <div className='w-full'>
                    <label>Profile Image</label>
                    <input type="file" ref={imageref} className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <div className='w-full'>
                    <label>Name</label>
                    <input type="text" ref={nameref} placeholder='Name' className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <div className='w-full'>
                    <label>Education</label>
                    <input type="text" ref={educationref} placeholder='Education' className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <div className='w-full'>
                    <label>Facebook Link</label>
                    <input type="text" ref={facebookRef} placeholder='Facebook' className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <div className='w-full'>
                    <label>Instagram Link</label>
                    <input type="text" ref={instagramRef} placeholder='Instagram' className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <div className='w-full'>
                    <label>Twitter Link</label>
                    <input type="text" ref={twitterRef} placeholder='Twitter' className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <div className='w-full'>
                    <label>YouTube Link</label>
                    <input type="text" ref={youtubeRef} placeholder='YouTube' className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <div className='w-full'>
                    <label>Website Link</label>
                    <input type="text" ref={websiteRef} placeholder='Website' className='border rounded-2xl w-full px-2 py-1' />
                </div>

                <button
                    onClick={() => fun1()}
                    className="bg-blue-500 w-full text-white rounded-2xl py-2 hover:bg-blue-600"
                >
                    Save
                </button>

                {message && (
                    <div className="text-center w-full text-green-600 font-semibold mt-2">
                        {message}
                    </div>
                )}
            </div>
        </>
    )
}
