import express from "express";
import {placeOrder,getOrders} from "../controllers/orderController.js"
import { verifyToken } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/",placeOrder);
router.get("/order",verifyToken,getOrders);

export default router;