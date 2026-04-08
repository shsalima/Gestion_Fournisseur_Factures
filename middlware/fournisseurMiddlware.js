import Fournisseur from "../models/Fournisseur.js"



import { body, validationResult } from "express-validator";


export const fournisseurValidate = [
  body("name")
    .notEmpty()
    .withMessage("Le champ name est obligatoire")
    .isLength({ min: 2 })
    .withMessage("le name doit contenir au moins 2 caracter"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("format email invalide"),

  body("phone")
    .optional()
    .isString()
    .withMessage("phone doit etre une chaine de caractére"),

  body("adress")
    .optional()
    .isString()
    .withMessage("adress doit etre une chaine de caractére"),



];
export const handleErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};





export const verfyEmailFourniseur=async(req,res,next)=>{
    const {email}=req.body

    const fournisseur=await Fournisseur.findOne({email})
    if(fournisseur){
        res.status(400).json({message:"déjà exist cette fournisur , changer email pour crée fourniseur"})
    }
    next()

}

export const checkfournissuerOfClientAuth=async(req,res,next)=>{
        const {id}=req.params
        const fournisseur=await Fournisseur.findById(id)
           if(!fournisseur){
        return res.status(404).json({message:"cette fournisseur ne trouve pas"})
    }
    if(fournisseur.user.toString() !==req.user._id.toString()){
        return res.status(403).json({message:"n'a  pas  l'accés de client  à cette fournisseur "})
    }
    req.fournisseur=fournisseur
    next()

}