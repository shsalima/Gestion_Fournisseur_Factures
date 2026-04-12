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
import { getStat } from "../controllers/statscontroller.js";

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
fournisseurRoute.get("/:id/stats", verifyToken,checkfournissuerOfClientAuth,getStat);

export default fournisseurRoute;
