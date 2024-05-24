import mongoose from "mongoose";
import otpGenerator from 'otp-generator'
export async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URI!) // this means it should be presnect in .env file
        console.log(`connected to db`)
    } catch (error) {
        console.log("Error in DB connection",error)
        process.exit(1)
    }
}