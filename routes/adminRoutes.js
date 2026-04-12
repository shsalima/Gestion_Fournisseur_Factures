import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import { getClients } from "../controllers/adminController.js";

const adminRoute = express.Router();
adminRoute.get("/",verifyToken,getClients)


export default adminRoute;