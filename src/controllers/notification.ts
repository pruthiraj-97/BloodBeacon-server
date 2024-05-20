import { Request,Response } from "express";
import { notificationI } from "../Types/notification";
import { fromZodError } from "zod-validation-error";
import { dataValidationError } from "../config/dataValidationError";
import userSchema from "../models/user.model";
import requestschema from "../models/requestmessage.model";
import { fetchUserDetails } from "../middleware/fetchUserDetails";
export async function sendNotification(req:Request,res:Response){
    try {
        const user=await fetchUserDetails(req)
        const notification={
            message:req.body.message,
            bloodGroup:req.body.bloodGroup,
            contactNumber:parseInt(req.body.contactNumber),
        }
        const result=notificationI.safeParse(notification)
        if(!result.success){
            const response=fromZodError(result.error)
            const message=dataValidationError(response.details)
            return res.status(400).json({
                success:false,
                message:message
            })
        }
        const newRequest=await requestschema.create(
            {
                ...result.data,
                user:user.id
            }
        )
        const allusers=await userSchema.find({
            bloodGroup:result.data.bloodGroup
        })
       for(const user of allusers){
        // if online in this app then send with socket or push it in notification
           await userSchema.updateOne({_id:user.id},{
               $push:{
                urgentNotifications:newRequest._id
               }
           })
       }
       return res.status(200).json({
           success:true,
           message:"notification sent"
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}