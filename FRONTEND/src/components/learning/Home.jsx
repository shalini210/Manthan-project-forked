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
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-8 py-12 overflow-hidden">

        {/* Floating decorative shapes */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-blue-300 rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 bg-indigo-300 rounded-full opacity-20 animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-[-80px] w-60 h-60 bg-teal-300 rounded-full opacity-25 animate-spin-slow"></div>

        <div className="relative max-w-7xl mx-auto z-10 text-center">

          {/* Welcome Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-pulse">
              Welcome to Our Platform! 👋
            </h1>
            <p className="text-gray-700 text-lg md:text-xl">
              Sign up to create an account and log in to unlock your personalized dashboard.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-t-4 border-gradient-to-r from-blue-500 via-teal-500 to-indigo-500">
              <div className="text-5xl mb-4 text-blue-500">✨</div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">Explore</h2>
              <p className="text-gray-600 text-sm">
                Discover what our platform has to offer and learn more about its features.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-t-4 border-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
              <div className="text-5xl mb-4 text-teal-500">🌟</div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">Connect</h2>
              <p className="text-gray-600 text-sm">
                Join our community, ask questions, and engage with other users.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-t-4 border-gradient-to-r from-indigo-400 via-blue-400 to-teal-400">
              <div className="text-5xl mb-4 text-indigo-500">💡</div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">Learn</h2>
              <p className="text-gray-600 text-sm">
                Browse tutorials, guides, and tips to enhance your skills.
              </p>
            </div>
          </div>

          {/* Separate Register & Login Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/registration"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
            >
              Register
            </a>
            <a
              href="/login"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-blue-500 transition transform hover:-translate-y-1"
            >
              Login
            </a>
          </div>

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
          <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50 px-8 py-12 overflow-hidden">

            {/* Floating shapes */}
            <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-blue-300 rounded-full opacity-30 animate-pulse-slow"></div>
            <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 bg-indigo-300 rounded-full opacity-20 animate-pulse-slower"></div>
            <div className="absolute top-1/2 left-[-80px] w-60 h-60 bg-teal-300 rounded-full opacity-25 animate-spin-slow"></div>

            <div className="relative max-w-7xl mx-auto z-10">

              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-pulse">
                  Welcome Back, <span className="text-blue-600">{username}</span>! 👋
                </h1>
                <p className="text-gray-700 text-lg md:text-xl">
                  Your personal dashboard is ready. Let’s make today amazing!
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-t-4 border-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 animate-fadeIn">
                  <div className="text-5xl mb-4 text-blue-500">✨</div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-900">Inspiration</h2>
                  <p className="text-gray-600 text-sm">
                    Fresh ideas and motivation to fuel your creativity and focus.
                  </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-t-4 border-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 animate-fadeIn delay-100">
                  <div className="text-5xl mb-4 text-teal-500">🌟</div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-900">Growth</h2>
                  <p className="text-gray-600 text-sm">
                    Track your achievements and see how far you’ve come each day.
                  </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-t-4 border-gradient-to-r from-indigo-400 via-blue-400 to-teal-400 animate-fadeIn delay-200">
                  <div className="text-5xl mb-4 text-indigo-500">💡</div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-900">Wellbeing</h2>
                  <p className="text-gray-600 text-sm">
                    Stay energized and balanced. Remember to take mindful breaks.
                  </p>
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="mt-20 bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500 rounded-3xl shadow-2xl p-10 text-center text-white border-t-4 border-white animate-bounce">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Keep Thriving 💪</h2>
                <p className="text-lg md:text-xl">
                  Every step counts. Keep your momentum, and enjoy the journey!
                </p>
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
