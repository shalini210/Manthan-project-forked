import React, { useState } from 'react';
import ChangePassword from './Changepassword';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import Profileimage from './Profileimage';
import AskQuestions from './AskQuestions';

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const userislogin = useSelector((store) => store.user.userislogin);

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

      {/* Content Area */}
      <div className="flex-1 p-10">
        {selectedMenu === 'home' && (
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
