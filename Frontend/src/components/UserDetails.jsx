import React, { useState } from 'react'

const UserDetails = ({onDetailsSubmit}) => {
  const [customerName,setCustomerName]=useState("");
  const [contact,setContact]=useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDetailsSubmit({ customerName, contact });
  };

  return (
    <div className="flex h-screen justify-center items-center ">
    <form onSubmit={handleSubmit} className=" w-full max-w-md space-y-4 bg-purple-400 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Details</h2>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border p-2 rounded-lg w-full"
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border p-2 rounded-lg w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
      >
        Save Details
      </button>
      </form>
      </div>
  )
}

export default UserDetails
