import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import { verfyEmailFourniseur } from "../middlware/fournisseurMiddlware.js";
import { createFournissoeur } from "../controllers/fournisseurContoller.js";


const fournisseurRoute=express.Router()


fournisseurRoute.post("/",verifyToken,verfyEmailFourniseur,createFournissoeur)


export default fournisseurRoute