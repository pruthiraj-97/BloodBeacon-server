import express,{ NextFunction, Request,Response } from "express";
import dotenv  from 'dotenv'
import cors from 'cors'
import { connectDB } from "./config/db";
import authRouter from './routers/auth'
import bloodBankRouter from './routers/BloodBank'
import searchBloodBank from './routers/BloodBankSearch'
dotenv.config();
const app=express()
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL
}))
app.use('/api/auth',authRouter)
app.use('/api/bloodbank',bloodBankRouter)
app.use('/api/userbloodbank',searchBloodBank)
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.send('well come to my server')
})
app.listen(process.env.PORT,()=>
    console.log(`server is running on port ${process.env.PORT}`
))
connectDB()