import Facture from "../models/Facture"


export const checkFactureIdpaiment=async(req,res,next)=>{
    try{

        const factureId=req.params.factureId
    
        const facture=await Facture.findById(factureId)
    
        if(!facture){
            return res.status(404).json({message:"facture non trouvé"})
        }
        if(facture.user.toString() !==req.user.id){
            return res.status(403).json({message:"accés interdit"})
        }
        req.facture=facture
        next()
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}