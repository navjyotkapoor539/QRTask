import React, { useEffect, useState } from 'react'
import UserDetails from '../components/UserDetails';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import GetAdminFromToken from '../components/GetAdminFromToken';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });
  const [orderItems, setOrderItems] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const user=GetAdminFromToken();
  const isAdmin = user?.isAdmin || false;

  const navigate=useNavigate();
  useEffect(()=>{
    const fetchMenu=async()=>{
      try {
        const response=await axios.get("https://qrtask-2.onrender.com/menu/menu");
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    }
    fetchMenu();
  },[]);

  const handleAddItem=async()=>{
    try {
      const response=await axios.post("https://qrtask-2.onrender.com/menu/menu",newItem);
      setMenu([...menu,response.data]);
      setNewItem({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  }

  const handleDeleteItem=async(id)=>{
    try {
      await axios.delete(`https://qrtask-2.onrender.com/menu/menu${id}`);
      setMenu(menu.filter((item)=>item._id!==id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  }

  const handleQuantityChange=(menuItemId,quantity)=>{
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.menuItemId === menuItemId);
      if (existingItem) {
        existingItem.quantity = quantity;
        return [...prevItems];
      } else {
        return [...prevItems, { menuItemId, quantity }];
      }
    });
  }

  const handlePlaceOrder=async()=>{
    if (!userDetails) {
      alert("Please fill in your details first.");
      return;
    }
    try {
      const order={...userDetails,items:orderItems};
      await axios.post("https://qrtask-2.onrender.com/orders",order);
      setOrderItems([]);
      navigate("/thank-you");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  }


  return (
    <div className="p-4 md:p-8 bg-purple-800 min-h-screen">
    <h1 className="text-3xl font-bold text-center text-white mb-4">Menu</h1>
    {!isAdmin && !userDetails ? (
      <UserDetails onDetailsSubmit={(details) => setUserDetails(details)} />
    ) : (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
          {menu.map((item) => (
            <div key={item._id} className="p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl bg-purple-400 rounded-lg shadow-md flex flex-col justify-between">
            <img src={item.imageUrl} alt={item.name} className="w-44 sm:w-48 md:w-56 h-auto object-cover rounded-lg mb-4 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-600 font-bold">${item.price}</p>
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="p-2 border border-gray-300 rounded w-full"
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value, 10))
                  }
                />
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="mt-2 text-red-500 underline w-full text-left"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-slate-100 py-2 px-4 rounded hover:bg-green-900 duration-300 font-semibold"
          >
            Place Order
          </button>
        </div>
        {isAdmin && (
          <div className="mt-8 bg-purple-400 h-auto p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <input
                type="text"
                placeholder="Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="border p-2 rounded-lg mb-4 sm:mb-0 flex-1"
              />
              <input
                type="text"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="border p-2 rounded-lg mb-4 sm:mb-0 flex-1"
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="border p-2 rounded-lg flex-1"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddItem}
                className="bg-green-500 hover:bg-green-900 duration-300 font-semibold text-white py-2 px-4 rounded-md"
              >
                Add Item
              </button>
            </div>
          </div>
        )}
      </>
    )}
  </div>
  );
};

export default MenuPage
