import express from "express";
import { checkEmail, handleErrors, loginCheckEmailPasseword, loginValidation, registerValidate } from "../middlware/authMiddleware.js";
import { login, registerUser } from "../controllers/authController.js";


const authRoute=express.Router()

authRoute.post("/register",registerValidate,handleErrors,checkEmail,registerUser)
authRoute.post("/login",loginValidation,loginCheckEmailPasseword,login)


export default authRoute;