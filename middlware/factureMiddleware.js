// middlewares/invoice.validation.js
import { body, validationResult } from "express-validator"
import Fournisseur from "../models/Fournisseur.js";
import Facture from "../models/Facture.js";

export const validateFacture = [
  body("supplierId")
    .notEmpty().withMessage("supplierId requis")
    .isMongoId().withMessage("supplierId invalide"),

  body("amount")
    .notEmpty().withMessage("amount requis")
    .isFloat({ gt: 0 }).withMessage("amount doit être > 0"),

  body("dueDate")
    .notEmpty().withMessage("dueDate requis")
    .isISO8601().withMessage("date invalide"),

  body("description")
    .optional()
    .isString().withMessage("description doit être string"),

]


export const handleErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};


export const  checkSupplier=async(req,res,next)=>{
    try{
        const {supplierId}=req.body
        const userId=req.user.id

        const supplier=await Fournisseur.findOne({_id:supplierId,user:userId})
        if(!supplier){
            return res.status(403).json({message:"fournisseur non autorisé"})

        }
        req.supplier=supplier
        next()
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

// update facture middleware
export const  checkeFacture =async(req,res,next)=>{
    try{
        const userId=req.user.id
        const factureId=req.params.id


        const facture=await Facture.findById(factureId)

        if(!facture){
            return res.status(404).json({message:"facture non trouvé"})
        }

      if(facture.userId.toString()!==userId){
        return res.status(403).json({message:"accés refusé"})
      }
      req.facture=facture
      next()


    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

