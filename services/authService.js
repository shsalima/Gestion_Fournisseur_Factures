import mongoose from 'mongoose';
import User from '../models/User';


export async function registerService(req,res){
    const {name,email,password,role}=req.body
    const hashPassword=await bcrpyt.hash(password,12)

    const user=await User.create({
        name,
        email,
        password:hashPassword,
        role

    })
    return user
} 
