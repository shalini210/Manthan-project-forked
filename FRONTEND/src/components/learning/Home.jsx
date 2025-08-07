import React, { useState } from 'react';
import ChangePassword from './Changepassword';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import Profileimage from './Profileimage';
import AskQuestions from './AskQuestions';
import { Link } from 'react-router-dom';
export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const userislogin = useSelector((store) => store.user.userislogin);
  const username = useSelector((store) => store.user.userdata.name);
  if (!userislogin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">User Menu</h2>
        <button
          onClick={() => setSelectedMenu('home')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${selectedMenu === 'home' ? 'bg-gray-700' : ''
            }`}
        >
          Home
        </button>
        <button
          onClick={() => setSelectedMenu('question')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${selectedMenu === 'question' ? 'bg-gray-700' : ''
            }`}
        >
          Ask Questions
        </button>
        <button
          onClick={() => setSelectedMenu('changePassword')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${selectedMenu === 'changePassword' ? 'bg-gray-700' : ''
            }`}
        >
          Change Password
        </button>
        <button
          onClick={() => setSelectedMenu('profile')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${selectedMenu === 'profile' ? 'bg-gray-700' : ''
            }`}
        >
          Profile
        </button>
        <button
          onClick={() => setSelectedMenu('profile Image')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${selectedMenu === 'profile Image' ? 'bg-gray-700' : ''
            }`}
        >
          Profile Image
        </button>
      </nav>

      <div className="flex-1 p-10">
        {/* {selectedMenu === 'home' && (
          <div className="bg-white p-6 shadow-2xl rounded-lg text-left">
            <h2 className="text-xl font-semibold mb-2">Hello, {username} 👋</h2>
            <p className="text-gray-700">Welcome to your dashboard.</p>
          </div>
        )} */}

        {selectedMenu === 'home' && (
          <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-10">
            <div className="max-w-6xl mx-auto">

              <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800">Welcome back, <span className="text-indigo-600">{username}</span> 👋</h1>
                <p className="text-gray-600 mt-2 text-lg">Here's a quick overview of your dashboard.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


                <Link to={'/testing'}>
                  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border-t-4 border-indigo-500">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Your Questions</h2>
                    <p className="text-sm text-gray-600">View or manage questions you’ve asked.</p>
                  </div>
                </Link>


                <Link to={'/testing'}>
                  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border-t-4 border-green-500">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Ask New Question</h2>
                    <p className="text-sm text-gray-600">Submit a new question with rich formatting.</p>
                  </div>
                </Link>


                <Link to={'/changepassword'}>
                  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border-t-4 border-yellow-500">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Change Password</h2>
                    <p className="text-sm text-gray-600">Get updates on responses or new activity.</p>
                  </div>
                </Link>


                <Link to={'/profilesetting'}>
                  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border-t-4 border-pink-500">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Profile Settings</h2>
                    <p className="text-sm text-gray-600">Update your info and preferences.</p>
                  </div>
                </Link>
              </div>

              <div className="mt-12 p-6 bg-white rounded-xl shadow border">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tips</h3>
                <p className="text-gray-600 text-sm">Want to stand out? Ask clear, specific questions and provide all necessary context.</p>
              </div>
            </div>
          </div>
        )}

        {selectedMenu === 'question' && (
          <div className="bg-white p-6 shadow-2xl rounded-lg text-left">
            <h1 className="text-2xl text-center font-bold mb-4">Ask Question?</h1>
            <AskQuestions />
          </div>
        )}

        {selectedMenu === 'changePassword' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Change Password</h2>
            <ChangePassword />
          </div>
        )}

        {selectedMenu === 'profile' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create Profile</h2>
            <Profile />
          </div>
        )}

        {selectedMenu === 'profile Image' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Profile Image</h2>
            <Profileimage />
          </div>
        )}

      </div>
    </div>
  );
}
