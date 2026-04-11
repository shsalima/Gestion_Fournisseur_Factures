import Paiement from "../models/Paiement.js"



export const createPaiement=async(req,res)=>{
    try{
        const facture=req.facture
        const {amount,paymentDate,mode_paiement,note}=req.body
        const factureId=req.params.id
        
            const pauments=await Paiement.find({facture:factureId})
            // ch7al khalss fiha
            facture.totalPaid=pauments.reduce((total,payment)=>total+payment.amount,0)
        
        
            // ch7al ba9i fiha
            
          facture.remianingAmount=facture.amount-facture.totalPaid
            if(amount>facture.remianingAmount || amount + facture.totalPaid>facture.amount){
                return res.status(400).json({message:`montant de paiment dépasse montant restant a payée ${facture.remianingAmount}`})
            }

            const paiement=await Paiement.create({
                factureId:factureId,
                userId:req.user.id,
                amount,
                paymentDate,
                mode_paiement,
                note,

            })


            const newtotal=facture.totalPaid+amount
            if(newtotal === facture.amount){
                facture.status="paid"
            }else{
                facture.status="partially_paid"
            }
            await facture.save()
            await paiement.save()

            res.status(201).json({message:"paiement créé avec succés",paiement})    
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}