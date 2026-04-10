import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import { checkeFacture, checkSupplier, validateFacture } from "../middlware/factureMiddleware.js";
import { createFacture, getFactureId, getFactures, updateFacture } from "../controllers/factureController.js";

const factureRoute=express.Router()

factureRoute.post("/",verifyToken,validateFacture,checkSupplier,createFacture)
factureRoute.get("/",verifyToken,getFactures)


factureRoute.put("/:id",verifyToken,checkeFacture,checkSupplier,updateFacture)


export default factureRoute