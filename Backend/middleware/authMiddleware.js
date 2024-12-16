import jwt from "jsonwebtoken"

export const verifyToken=(req,res,next)=>{
    const token =req.cookies.authToken;
    if(!token){
        return res.status(403).json({ message: "No token provided" });
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.adminId=decoded.id;
        next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }
}