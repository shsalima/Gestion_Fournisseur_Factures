import Fournisseur from "../models/Fournisseur.js"



export const createFournissoeur=async(req,res)=>{
    try{
        const {name,email,phone,adress}=req.body
        const fournisseur=await Fournisseur.create({
            name,
            email,
            phone,
            adress,
            user:req.user._id
        })
        res.status(201).json({message:"fournisseur creé avec succés",fournisseur})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}