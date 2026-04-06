import { registerService } from "../services/authService";


export async function registerController(req,res){
    const user=await registerService(req,res)
    res.status(201).json({message:"create user ",user})

}