import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"

export const adminLogin=async(req,res)=>{
    const {username ,password}=req.body;

    try {
        const admin =await Admin.findOne({username});
        if(!admin){
            return res.status(401).json({message:"Invalid username or password"})
        }
        const isPasswordValid=await bcrypt.compare(password,admin.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid username or password"});
        }

        //Generate JWT TOKEN
        const token =jwt.sign({id:admin._id,username: admin.username, isAdmin: true},process.env.JWT_SECRET,{
            expiresIn:"20d"
        });
        //set token in httpOnly cookie
        res.cookie("authToken",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
        })
        res.status(200).json({ message: "Login successful",token});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const adminLogout = (req, res) => {
    res.clearCookie("authToken", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  };