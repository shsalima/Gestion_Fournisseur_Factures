import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"



export const createFacture= async(req,res)=>{
    try{

        const {supplierId,amount,dueDate,description}=req.body
        const userId=req.user.id
    
        const facture=await Facture.create({
            userId,
            supplierId,
            amount,
            dueDate,
            description
        })
    
        return res.status(201).json({message:"facture created",facture})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    
}