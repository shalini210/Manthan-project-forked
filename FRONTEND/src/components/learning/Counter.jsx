import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    DecreaseValueEnteredByUser,
    decrement,
    IncreaseValueEnteredByUser,
    increment,
    incrementByvalue
} from '../../slices/CounterSlice'

export default function Counter() {
    const data = useSelector((s) => s.counter)
    const dispatch = useDispatch()
    const num = useRef()
    const decNum = useRef()

    return (
        <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
            {/* Count Display */}
            <div className="text-center text-xl font-bold">
                Count: {data.count}
            </div>

            {/* Increase Input */}
            <div className="flex gap-2 items-center justify-center">
                <input
                    ref={num}
                    type="number"
                    placeholder="Enter value"
                    className="border px-2 py-1 rounded"
                />
                <button
                    onClick={() => dispatch(IncreaseValueEnteredByUser(num.current.value))}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Increase
                </button>
            </div>

            {/* Decrease Input */}
            <div className="flex gap-2 items-center justify-center">
                <input
                    ref={decNum}
                    type="number"
                    placeholder="Enter value"
                    className="border px-2 py-1 rounded"
                />
                <button
                    onClick={() => dispatch(DecreaseValueEnteredByUser(decNum.current.value))}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Decrease
                </button>
            </div>

            {/* Basic Controls */}
            <div className="flex gap-4 justify-center mt-4">
                <button
                    onClick={() => dispatch(decrement())}
                    className="bg-red-400 text-white px-4 py-1 rounded"
                >
                    -
                </button>
                <button
                    onClick={() => dispatch(increment())}
                    className="bg-green-400 text-white px-4 py-1 rounded"
                >
                    +
                </button>
                <button
                    onClick={() => dispatch(incrementByvalue(4))}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                    +4
                </button>
            </div>
        </div>
    )
}
