import mongoose from 'mongoose'
import AppontmentSchema from '../models/appointment.model'
import BloodBankSchema from '../models/BloodBank.model'
import { appointmentI, appointment } from '../Types/appointment'
import { Request,Response } from 'express'
import { fromZodError } from 'zod-validation-error'
import { dataValidationError } from '../config/dataValidationError'
import { fetchUserDetails } from '../middleware/fetchUserDetails'
exports.createAppointMent=async (req:Request,res:Response)=>{
    try {
        const newAppointment:appointmentI={
            name:req.body.name,
            age:parseInt(req.body.age),
            bloodGroup:req.body.bloodGroup,
            contactNumber:parseFloat(req.body.contactNumber)
        }
        const verifyData=appointment.safeParse(newAppointment)
        if(!verifyData.success){
            const response=fromZodError(verifyData.error)
            const message=dataValidationError(response.details)
            return res.status(400).json({
                status:400,
                success:false,
                message:message
            })
        }
        const user=await fetchUserDetails(req)
        const {id}=req.params
        const createAppointment=await AppontmentSchema.create({
            ...newAppointment,  
            bloodBankId:new mongoose.Types.ObjectId(id),
            userId:user.id
        })
        await BloodBankSchema.updateOne({_id:id},{
            $push:{
                appointment:createAppointment._id
            }
        })
        return res.status(200).json({
            status:200,
            success:true,
            message:"appointment created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}