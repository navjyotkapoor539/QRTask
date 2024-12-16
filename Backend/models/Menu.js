import mongoose from "mongoose";

const MenuSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description: { type: String, required: true },
     price: { type: Number, required: true },
     imageUrl: { type: String, required: true },
});

const Menu=mongoose.model("Menu",MenuSchema);
export default Menu;