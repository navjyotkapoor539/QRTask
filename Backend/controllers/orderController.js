import Menu from "../models/Menu.js";
import Order from "../models/Order.js";

export const placeOrder=async(req,res)=>{
    try {
        const { customerName, contact, items } = req.body;

        let totalAmount=0;
        for(const item of items){
            const menuItem=await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ message: `Menu item not found: ${item.menuItemId}` });
              }
              totalAmount += menuItem.price * item.quantity;
        }
        const newOrder=new Order({customerName,contact,items,totalAmount});
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getOrders=async(req,res)=>{
    try {
        const orders=await Order.find().populate("items.menuItemId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}