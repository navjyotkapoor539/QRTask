import Menu from "../models/Menu.js";

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMenuItem = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newItem = new Menu({ name, description, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteItem = await Menu.findByIdAndDelete(id);
    if (!deleteItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
