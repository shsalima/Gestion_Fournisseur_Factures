import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import { checkeFacture, checkSupplier, validateFacture } from "../middlware/factureMiddleware.js";
import { createFacture, getFactureId, getFactures, updateFacture } from "../controllers/factureController.js";
import { checkFactureIdpaiment, checkStatusFacture } from "../middlware/paimentMiddlware.js";
import { createPaiement, getPaiementByFacture } from "../controllers/paiementController.js";

const factureRoute=express.Router()

factureRoute.post("/",verifyToken,validateFacture,checkSupplier,createFacture)
factureRoute.get("/",verifyToken,getFactures)


factureRoute.put("/:id",verifyToken,checkeFacture,checkSupplier,updateFacture)

factureRoute.post("/:id/payments",verifyToken,checkeFacture,checkFactureIdpaiment,checkStatusFacture,createPaiement)
factureRoute.get("/:id/payments",verifyToken,checkeFacture,getPaiementByFacture)


export default factureRoute