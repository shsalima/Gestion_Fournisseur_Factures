import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import { fournisseurValidate, handleErrors, verfyEmailFourniseur } from "../middlware/fournisseurMiddlware.js";
import { createFournissoeur, getFournisseurs } from "../controllers/fournisseurContoller.js";


const fournisseurRoute=express.Router()


fournisseurRoute.post("/",verifyToken,fournisseurValidate,handleErrors,verfyEmailFourniseur,createFournissoeur)
fournisseurRoute.get("/",verifyToken,getFournisseurs)


export default fournisseurRoute