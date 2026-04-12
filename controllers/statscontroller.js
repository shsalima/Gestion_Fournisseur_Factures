import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"



export const getStat=async(req,res)=>{
    try{
        const id=req.params.id

        const fournisseur=await Fournisseur.findOne({_id:id})
       
        const factures= await Facture.find({supplierId:fournisseur._id})
        const totalInvoices=factures.length

        const totalAmount=factures.reduce((sum,f)=>sum +=f.amount,0)
        
        return res.status(200).json({totalInvoices, totalAmount})

    }catch(err){
            return res.status(500).json({message:err.message})
}
    }
