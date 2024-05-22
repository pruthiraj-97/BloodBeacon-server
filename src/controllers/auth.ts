import { userSignUp,userLogin } from "../Types/auth";
import { Request,Response } from "express";
import  {fromZodError} from 'zod-validation-error'
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import bcrypt from 'bcryptjs'
import userSchema from "../models/user.model"
import { sendEmail } from "../config/email";
import { dataValidationError } from "../config/dataValidationError";
export async function signUp(req:Request,res:Response){
    try {
        const user={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            contactNumber:parseInt(req.body.contactNumber),
            bloodGroup:req.body.bloodGroup.trim()
        }
        const typeResult=userSignUp.safeParse(user)
        if(!typeResult.success){
            const response=fromZodError(typeResult.error)
            const message=dataValidationError(response.details)
            return res.status(400).json({
                status:400,
                success:false,
                message:message
            })
        }
        // const isUserExist=await userSchema.findOne({
        //     $or:[
        //         {email:user.email},
        //         {contactNumber:user.contactNumber}
        //     ]
        // })
        // if(isUserExist){
        //     return res.status(400).json({
        //         success:false,
        //         message:"user already exist , please enter a new email or contact number"
        //     })
        // }
        const generateOtp=otpGenerator.generate(6, {upperCaseAlphabets: false,specialChars: false
        ,lowerCaseAlphabets: false
         })
        console.log(generateOtp)
        const otp=parseInt(generateOtp)
        const hashPassword=await bcrypt.hash(user.password,10)
        user.password=hashPassword
        const newUser=await userSchema.create({
            ...user,
            varificationCode:otp
        })

        // await sendEmail(newUser.email,newUser.name,otp)

        return res.status(200).json({
            status:200,
            success:true,
            message:"user created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export async function VarifyUser(req:Request,res:Response){
   try {
     const {email,verificationCode}=req.body
     const userExist=await userSchema.findOne({email})
     if(userExist?.varificationCode!=parseInt(verificationCode)){
        return res.status(400).json({
            status:400,
            success:false,
            message:"invalid otp"
        })
     }
     await userSchema.updateOne({
        email:userExist?.email
    },{
        $set:{
            isVarified:true
        }
    })
    return res.status(200).json({
        status:200,
        success:true,
        message:"user varified"
    })
   } catch (error) {
       return res.status(500).json({
           status:500,
           success:false,
           message:error
       })
   }
}

export async function login(req:Request,res:Response){
    try {
        const loginData={
            email:req.body.email,
            password:req.body.password
        }
        const varifyResult=userLogin.safeParse(loginData)
        if(!varifyResult.success){
            const errorMessage=fromZodError(varifyResult.error)
            return res.status(400).json({
                status:400,
                success:false,
                message:errorMessage
            })
        }
        const userExist=await userSchema.findOne({email:loginData.email})
        if(!userExist){
            return res.status(400).json({
                status:400,
                success:false,
                message:["user not found"]
            })
        }
        // if(!userExist.isVarified){
        //     return res.status(400).json({
        //         success:false,
        //         message:"user not varified"
        //     })
        // }
        const paswordVerify=await bcrypt.compare(loginData.password,userExist.password)
        if(!paswordVerify){
            return res.status(400).json({
                status:400,
                success:false,
                message:["invalid password"]
            })
        }
        const payload={
            id:userExist._id,
            name:userExist.name,
            email:userExist.email,
            contactNumber:userExist.contactNumber,
            bloodGroup:userExist.bloodGroup
        }
        const token=await jwt.sign(payload,process.env.JWT_SECRET!,{
            expiresIn:'1d'
        })
        const response=res.cookie('token',token,{
            httpOnly:true,
            expires:new Date(Date.now()+60*60*1000)
            })
                          .status(200)
                          .json({
                              status:200,
                              success:true,
                              message:"login successfully",
                              token
                          })
        return response
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}