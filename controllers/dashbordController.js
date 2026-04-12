import mongoose from "mongoose"
import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"


export const getDashbordDT=async(req,res)=>{
    try{
        const userId=new mongoose.Types.ObjectId(req.user.id)
        const totalFournisseurs=await Fournisseur.countDocuments({user:userId})
        const totalInvoices=await Facture.countDocuments({userId:userId})
        const totalAmountAgg=await Facture.aggregate([
            {
                $match:{userId: userId}
            },
            {
                $group:{
                    _id:null,
                    total:{$sum:"$amount"}
                }

            }

        ])
          const totalAmount =
      totalAmountAgg.length > 0
        ? totalAmountAgg[0].total
    : 0;
        return res.status(200).json({totalFournisseurs, totalInvoices, totalAmount})
        
      
    }catch(err){
        return res.status(500).json({message:err.message})
}
}