import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import fournisseurRoute from "./routes/fournisseurRoutes.js";
import factureRoute from "./routes/facturesRoutes.js";
import dashboardRoute from "./routes/dashboardRoutes.js";
import adminRoute from "./routes/adminRoutes.js";


dotenv.config()
const app=express()
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/suppliers",fournisseurRoute)
app.use("/api/invoices",factureRoute)
app.use("/api/dashboard",dashboardRoute)
app.use("/api/admin", adminRoute)

const url_mongodb=process.env.MONGODB_URL
const port=process.env.PORT ||8000

app.listen(port,async()=>{
    console.log(`server runing in port ${port}`)
    try{
        await mongoose.connect(url_mongodb)
        console.log("mongoDB connected ")

    }catch(err){
       console.error("Erreur lors du démarrage du serveur",err.message)


}}
)


