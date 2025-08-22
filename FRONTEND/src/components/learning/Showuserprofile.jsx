import React, { useEffect, useState } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaGlobe,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_URL } from "../../Config";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Showuserprofile() {
    const { id } = useParams();
    console.log(id)
    const [user, setUser] = useState();

    useEffect(() => {
        async function fetchUser() {
            try {
                const url = `${API_URL}/user/${id}`;
                const res = await axios.get(url);
                setUser(res.data.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUser();
    }, [id]);

    const email = user?.email;
    const username = user?.name;
    const usereducation = user?.education;
    const userfacebook = user?.facebook;
    const userinstagram = user?.instagram;
    const usertwitter = user?.twitter;
    const useryoutube = user?.youtube;
    const userwebsite = user?.website;
    const profileImage = user?.profilepic;


    const about =
        `Hello! I’m John Doe, a passionate software developer who loves
        building web applications. I specialize in React, Node.js, and MongoDB.
        In my free time, I enjoy creating open-source projects and exploring
        new technologies.`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Banner */}
            <div className="h-56 bg-gradient-to-r from-indigo-600 to-blue-500 relative shadow-lg">
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-72px]">
                    <img
                        src={
                            profileImage
                                ? API_URL + profileImage
                                : "https://via.placeholder.com/150"
                        }
                        alt={username || "Profile"}
                        className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-indigo-200 hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="max-w-3xl mx-auto mt-24 px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        {username || "Unknown User"}
                    </h1>
                    <p className="text-lg text-gray-500 mt-1">
                        {usereducation || "No education info"}
                    </p>
                    <p className="text-sm text-gray-400">{email || "No email"}</p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mt-6">
                        {userfacebook && (
                            <SocialIcon href={userfacebook} color="blue" Icon={FaFacebookF} />
                        )}
                        {userinstagram && (
                            <SocialIcon href={userinstagram} color="pink" Icon={FaInstagram} />
                        )}
                        {usertwitter && (
                            <SocialIcon href={usertwitter} color="sky" Icon={FaTwitter} />
                        )}
                        {useryoutube && (
                            <SocialIcon href={useryoutube} color="red" Icon={FaYoutube} />
                        )}
                        {userwebsite && (
                            <SocialIcon href={userwebsite} color="gray" Icon={FaGlobe} />
                        )}
                    </div>
                </div>

                {/* About */}
                {about && (
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                            About
                        </h2>
                        <p className="text-gray-600 leading-relaxed">{about}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Social Icon Component
function SocialIcon({ href, color, Icon }) {
    const colors = {
        blue: "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white",
        pink: "bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white",
        sky: "bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white",
        red: "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white",
        gray: "bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white",
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 shadow ${colors[color]}`}
        >
            <Icon />
        </a>
    );
}
