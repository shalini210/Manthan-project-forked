import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API_URL } from '../../Config'
import axios from 'axios'

export default function Questions_Details() {
  const allquestions = useSelector((store) => store.allquestions.AllQuestionsData)
  const userislogin = useSelector((store) => store.user.userislogin);
  const user_id = useSelector((store) => store.user.userdata._id);
  const { id } = useParams()
  const Questiondetailsui = allquestions.find((m) => m._id === id)
  const question_id = Questiondetailsui?._id;


  const answerRef = useRef();
  const [showAnswerBox, setShowAnswerBox] = useState(false)
  const [showLoginMsg, setShowLoginMsg] = useState(false)
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    axios.get(`${API_URL}/useranswer/${question_id}`)
      .then((d) => {
        setAnswers(d.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, [question_id]);


  const handleAnswerClick = () => {
    if (userislogin) {
      setShowAnswerBox(true)
      setShowLoginMsg(false)
    } else {
      setShowLoginMsg(true)
      setTimeout(() => setShowLoginMsg(false), 5000)
    }
  }

  const saveAnswers = async () => {
    const answer = answerRef.current.value;
    let data = { question_id, user_id, answer };

    try {
      const res = await axios.post(API_URL + "/useranswer", data);
      console.log("Answer saved:", res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  let answersui = answers.map((ans) => (
    <div
      key={ans._id}
      className="bg-white p-5 my-4 rounded-lg border border-gray-200 shadow-sm"
    >

      <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
        <span className="font-semibold uppercase">Posted by :- {ans.user_name}</span>
        <span className="font-semibold">{new Date(ans.postdate).toLocaleDateString()}</span>
      </div>


      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <p className="text-gray-800 leading-relaxed">{ans.answer}</p>
      </div>
    </div>
  ));





  return (
    <div className="min-h-screen bg-[#f1f2f4] px-5 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto">

        <header className="mb-10 border-b pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Question Details</h1>
            <p className="text-sm text-gray-500 mt-2">Explore the complete details of the selected question.</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Posted by :-</label>
            <div className="flex gap-2 text-right items-center text-sm">
              <Link
                to={`/showuserprofile/${Questiondetailsui.user_id}`}
              >
                <img
                  src={API_URL + Questiondetailsui.profilepic}
                  alt="User Profile"
                  className="w-6 h-6 rounded-full object-cover border shadow"
                />
              </Link>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">{Questiondetailsui.user_name}</p>
            </div>
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
          <div className="bg-black text-white rounded-lg p-6  text-base  leading-relaxed max-h-[65vh] overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: (Questiondetailsui.question).replace('contenteditable="true"', 'contenteditable="false"') }} />
          </div>
        </section>

        <div className="mt-10">
          <button
            onClick={handleAnswerClick}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${showAnswerBox ? "hidden" : ""}`}
          >
            Answer
          </button>

          {/* Login message */}
          {showLoginMsg && (
            <p className="mt-3 text-red-600 font-medium">Please login before answering.</p>
          )}

          {showAnswerBox && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow border">
              <label className="block mb-2 text-sm font-medium text-gray-700">Your Answer</label>
              <textarea
                ref={answerRef}
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
                  onClick={() => saveAnswers()}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        <div>{answersui}</div>

      </div>
    </div>
  )
}
