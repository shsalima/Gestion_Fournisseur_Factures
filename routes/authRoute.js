import express from "express";
import { checkEmail, handleErrors, loginCheckEmailPasseword, loginValidation, registerValidate, verifyToken } from "../middlware/authMiddleware.js";
import { getProfil, login, registerUser } from "../controllers/authController.js";


const authRoute=express.Router()

authRoute.post("/register",registerValidate,handleErrors,checkEmail,registerUser)
authRoute.post("/login",loginValidation,loginCheckEmailPasseword,login)
authRoute.get("/me",verifyToken,getProfil)


export default authRoute;