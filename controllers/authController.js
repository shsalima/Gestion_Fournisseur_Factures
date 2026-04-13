
import mongoose from 'mongoose';
import User from '../models/User.js';

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export async function registerUser(req,res){
    const {name,email,password,role}=req.body
    try{

        const hashPassword=await bcrypt.hash(password,12)
    
        const user=await User.create({
            name,
            email,
            password:hashPassword,
            role
    
        })
        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        res.status(201).json({message:"create user ",token,user})
    }catch(err){
        res.status(500).json({msg:err.message})
    }
    
} 


export async function login (req,res){
    try{

        const token =jwt.sign(
           {
           id:req.user._id,
           role:req.user.role
           },
           process.env.JWT_SECRET,
           {expiresIn:"7d"}
        )
        res.status(200).json({message: "login success",token,user:{id:req.user._id,role:req.user.role}})
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}


export const getProfil=async(req,res)=>{
    try{
        return res.status(200).json({
            id:req.user._id,
             name: req.user.name,
             email: req.user.email,
             role: req.user.role,
             createdAt: req.user.createdAt
        })
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}




