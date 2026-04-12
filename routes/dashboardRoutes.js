import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import { getDashbordDT } from "../controllers/dashbordController.js";

const dashboardRoute=express.Router()

dashboardRoute.get("/",verifyToken,getDashbordDT)

export default dashboardRoute