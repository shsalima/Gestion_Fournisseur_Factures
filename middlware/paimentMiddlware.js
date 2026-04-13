import Facture from "../models/Facture.js"
import Paiement from "../models/Paiement.js"


export const checkFactureIdpaiment=async(req,res,next)=>{
    try{

        const factureId=req.params.id
    
        const facture=await Facture.findById(factureId)
    
        if(!facture){
            return res.status(404).json({message:"facture  non trouvé"})
        }
        if(facture.userId.toString() !==req.user.id){
            return res.status(403).json({message:"accés interdit"})
        }
        req.facture=facture
        next()
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const checkStatusFacture=async(req,res,next)=>{

    try{ 
    const {amount ,mode_paiement}=req.body
    const factureId=req.params.id
    const facture=await Facture.findById(factureId)
     if(!facture){
            return res.status(404).json({message:"facture non trouvé"})
        }
    if(facture.status==="paid"){
        return res.status(422).json({message:"facture déjà payée"})
    }
    if(!amount || amount <=0){
        return res.status(422).json({message:"montant de paiment requis, doit etre >0"})


    }
  
    if( !mode_paiement ||!["espéces", "chéque", "virement"].includes(mode_paiement)){
        return res.status(400).json({message:"mode de paiement invalide"})
    }

    req.facture=facture
    next()
    }catch(err){
        return res.status(500).json({message:err.message})
    }




}