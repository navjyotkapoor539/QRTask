import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMenu,deleteMenuItem,addMenuItem } from "../controllers/menuController.js";
const router=express.Router();

router.get("/menu", getMenu);
router.post("/menu", verifyToken, addMenuItem);
router.delete("/menu/:id", verifyToken, deleteMenuItem);

export default router;