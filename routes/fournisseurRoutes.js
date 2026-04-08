import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import {
  checkfournissuerOfClientAuth,
  fournisseurValidate,
  handleErrors,
  verfyEmailFourniseur,
} from "../middlware/fournisseurMiddlware.js";
import {
  createFournissoeur,
  deleteFournisseur,
  getFournisseurs,
  getSupplier,
  modifierFournisseur,
} from "../controllers/fournisseurContoller.js";

const fournisseurRoute = express.Router();

fournisseurRoute.post(
  "/",
  verifyToken,
  fournisseurValidate,
  handleErrors,
  verfyEmailFourniseur,
  createFournissoeur,
);
fournisseurRoute.get("/", verifyToken, getFournisseurs);
fournisseurRoute.get(
  "/:id",
  verifyToken,
  checkfournissuerOfClientAuth,
  getSupplier,
);
fournisseurRoute.delete(
  "/:id",
  verifyToken,
  checkfournissuerOfClientAuth,
  deleteFournisseur,
);
fournisseurRoute.put(
  "/:id",
  verifyToken,
  checkfournissuerOfClientAuth,
  fournisseurValidate,
  modifierFournisseur,
);

export default fournisseurRoute;
