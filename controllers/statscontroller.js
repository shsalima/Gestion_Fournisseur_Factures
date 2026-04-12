import Facture from "../models/Facture.js"
import Fournisseur from "../models/Fournisseur.js"



export const getStat=async(req,res)=>{
    try{
        const id=req.params.id

        const fournisseur=await Fournisseur.findOne({_id:id})
       
        const factures= await Facture.find({supplierId:fournisseur._id})
        const totalInvoices=factures.length

        const totalAmount=factures.reduce((sum,f)=>sum +=f.amount,0)

        const totalPaid =factures.reduce((sum,f)=>sum +=f.totalPaid,0)
        const totalRemaining=factures.reduce((sum,f)=>sum +=f.remianingAmount,0)

// totalAllFournisseur => total amount for all fournisseur for the user
        const AllFacturesFournisseur= await Facture.find({userId:req.user.id})
        console.log(AllFacturesFournisseur)
        // totalAllAmontFourniseur => total amount for all fournisseur for the user
        const totalAllAmontFourniseur=AllFacturesFournisseur.reduce((sum,f)=>sum +=f.amount,0)
        console.log(totalAllAmontFourniseur)
       
    
const pourcentage = AllFacturesFournisseur === 0 ? 0 : (totalAmount / AllFacturesFournisseur.length) * 100;

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




        
        return res.status(200).json({totalInvoices, totalAmount,totalPaid,totalRemaining,pourcentage,invoicesByStatus})

    }catch(err){
            return res.status(500).json({message:err.message})
}
    }




