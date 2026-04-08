import Fournisseur from "../models/Fournisseur.js"



export const createFacture= async(req,res)=>{
    const {supplierId,amount,dueDate,description}=req.body

    const fournisseur=await Fournisseur.findById(supplierId)
    if(!fournisseur){
        
        
    }
}