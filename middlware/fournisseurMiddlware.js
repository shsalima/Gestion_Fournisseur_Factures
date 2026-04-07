import Fournisseur from "../models/Fournisseur.js"



export const verfyEmailFourniseur=async(req,res,next)=>{
    const {email}=req.body

    const fournisseur=await Fournisseur.findOne({email})
    if(fournisseur){
        res.status(400).json({message:"déjà exist cette fournisur , changer email pour crée fourniseur"})
    }
    next()

}