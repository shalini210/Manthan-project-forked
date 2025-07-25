import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName } from '../../slices/CounterSlice'
export default function InCart() {
    let count = useSelector((store)=>store.counter.count)
    let username =useSelector((store)=>store.counter.username)
    const dispatch = useDispatch()
      let i = 0;
      useEffect(() => {
        i++;
        if (i <= 1) {
          let username = prompt("enter name:- ")
          dispatch(setUserName({ username: username }))
        }
    
      }, [])
  return (
    <>
    <h1>Welcome {username}</h1>
    <div>InCart : {count} </div>
    </>
  )
}