import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom";
const ThankYouPage = () => {

    const navigate=useNavigate();
    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate("/");
        },5000)
        return () => clearTimeout(timer);
    },[navigate])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-purple-800'>
      <h1 className='text-4xl font-bold text-green-500 mb-4'>Thank You! </h1>
      <p className='text-xl text-black mb-6'>
      Your order has been placed successfully.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Go Back to QR Page
      </button>
    </div>
  )
}

export default ThankYouPage
