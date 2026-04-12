import mongoose from "mongoose"
import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"


export const getDashbordDT=async(req,res)=>{
    try{
        const userId=req.user.id
        const factures = await Facture.find({
      userId: userId,
    });
        const totalFournisseurs=await Fournisseur.countDocuments({user:userId})
        const totalInvoices=await Facture.countDocuments({userId:userId})
       const totalAmount=factures.reduce(
      (sum, f) => sum + f.amount,
      0
    );
    const totalPaid = factures.reduce((sum, f) => sum + f.totalPaid, 0);
    const totalRemaining = totalAmount - totalPaid;
    const invoicesByStatus = factures.reduce((acc, facture) => {
    if(facture.status === "paid"){
        acc.paid +=1
    }else if(facture.status=== "partially_paid"){
        acc.partially_paid +=1
    }else if(facture.status ==="unpaid"){
        acc.unpaid +=1
    }
    return acc
},{paid:0,partially_paid:0,unpaid:0})


        return res.status(200).json({totalFournisseurs, totalInvoices, totalAmount,totalPaid, totalRemaining, invoicesByStatus})
        
      
    }catch(err){
        return res.status(500).json({message:err.message})
}
}