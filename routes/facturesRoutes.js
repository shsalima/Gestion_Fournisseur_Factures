import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import { checkSupplier, validateFacture } from "../middlware/factureMiddleware.js";
import { createFacture } from "../controllers/factureController.js";

const factureRoute=express.Router()

factureRoute.post("/",verifyToken,validateFacture,checkSupplier,createFacture)


export default factureRoute