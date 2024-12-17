import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminDash = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchOrders=async()=>{
      try {
        const response=await axios.get("https://qrtask-2.onrender.com/orders/order",{
         withCredentials: true
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  },[])

  const logout=async()=>{
    try {
      await axios.post("https://qrtask-2.onrender.com/admin/logout",{
        withCredentials:true
      });
      navigate("/admin/login");
      localStorage.removeItem("authToken");
    } catch (error) {
      console.log("Error in logout")
    }
  }

  return (
    <div className="p-6 bg-purple-800 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded-xl shadow-lg bg-purple-400 flex flex-col justify-between"
          >
            <h2 className="text-lg font-bold text-gray-900">Order ID: {order._id}</h2>
            <p className="text-gray-600">Customer: {order.customerName}</p>
            <p className="text-gray-600">Contact: {order.contact}</p>
            <p className="text-gray-800 font-semibold">Total Amount: ${order.totalAmount}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700">Items:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {order.items?.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item?.menuItemId?.name
                      ? `${item.menuItemId.name} - ${item.quantity}`
                      : "Item details unavailable"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-6 w-full border-2 border-white max-w-xs px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 duration-300 mx-auto block text-center"
      >
        Logout
      </button>
    </div>
  )
}

export default AdminDash
