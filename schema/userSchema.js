import {body,validationResult} from "express-validator"
import User from "../models/User"


export const registerValidate=[
    body("name")
    .notEmpty()
    .withMessage("name obligatoire")
    .isLength({min:2})
    .withMessage("Le nom doit avoir au moins 2 caractères"),
    body("email")
    .isEmail()
    .withMessage("email invalide")
    .custom(async(value)=>{
        const user=await User.findOne({email:value})
        if(user){
            throw new Error("email déjà utilisé")
        }
        return true
    }),
    body("password")
    .notEmpty()
    .withMessage("mot de passe obligatoire")
    .isLength({min:8})
    .withMessage("Password doit contenir au moins 8 caractères"),
    body("password_confirmation")
    .notEmpty()
    .withMessage("confirmation obligatoire")
    .custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error ("mot de passe de comfirmation pas le mémé mot de passe")

        }
        return true

    })
]