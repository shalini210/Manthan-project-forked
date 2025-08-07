import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API_URL } from '../../Config'

export default function Questions_Details() {
  const allquestions = useSelector((store) => store.allquestions.AllQuestionsData)
  const { id } = useParams()
  const Questiondetailsui = allquestions.find((m) => m._id === id)

  const [showAnswerBox, setShowAnswerBox] = useState(false)

  return (
    <div className="min-h-screen bg-[#f1f2f4] px-5 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto">

        <header className="mb-10 border-b pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Question Details</h1>
            <p className="text-sm text-gray-500 mt-2">Explore the complete details of the selected question.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-sm">
              <p className="text-gray-800 font-medium uppercase">{Questiondetailsui.user_name}</p>
            </div>
            <img
              src={API_URL + Questiondetailsui.profilepic}
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover border shadow"
            />
          </div>
        </header>

        <section className="border-b pb-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Title</label>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-snug uppercase">
                {Questiondetailsui.questiontitle}
              </h2>
            </div>
            <div className="text-right">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Posted On</label>
              <p className="text-sm text-gray-600">
                {new Date(Questiondetailsui.postdate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        <section>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Question Body</label>
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm text-base text-gray-900 leading-relaxed max-h-[65vh] overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: (Questiondetailsui.question).replace('contenteditable="true"', 'contenteditable="false"') }} />
          </div>
        </section>

        <div className="mt-10">
          <button
            onClick={() => setShowAnswerBox(true)}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${showAnswerBox ? "hidden" : ""
              }`}
          >
            Answer
          </button>

          {showAnswerBox && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow border">
              <label className="block mb-2 text-sm font-medium text-gray-700">Your Answer</label>
              <textarea
                className="w-full h-40 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 resize-none"
                placeholder="Type your answer here..."
              ></textarea>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowAnswerBox(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
