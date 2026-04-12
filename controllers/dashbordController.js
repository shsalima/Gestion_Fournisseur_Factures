import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"


export const getDashbordDT=async(req,res)=>{
    try{
        const userId=req.user.id
        const totalFournisseurs=await Fournisseur.countDocuments({user:userId})
        const totalInvoices=await Facture.countDocuments({userId:userId})
        return res.status(200).json({totalFournisseurs, totalInvoices})
        
      
    }catch(err){
        return res.status(500).json({message:err.message})
}
}