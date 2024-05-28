import { Request,Response } from "express";
import { notificationI } from "../Types/notification";
import { fromZodError } from "zod-validation-error";
import { dataValidationError } from "../config/dataValidationError";
import userSchema from "../models/user.model";
import requestschema from "../models/requestmessage.model";
import { fetchUserDetails } from "../middleware/fetchUserDetails";
import { getUserSocket} from "../routers/socket";
import io from '../routers/socket'
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
                status:400,
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
           if(user._id==user.id) continue
           let socketId=getUserSocket(user._id)
           await userSchema.updateOne({},{
               $push:{
                  urgentNotifications:newRequest._id
               }
           })
       }
       return res.status(200).json({
           status:200,
           success:true,
           message:"notification sent"
       })
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export async function removeNotification(req:Request,res:Response){
   try {
    const id=req.params.id
     const user=await fetchUserDetails(req)
     await userSchema.updateOne({_id:user.id},{
         $pull:{
             urgentNotifications:id
         }
     })
     return res.status(200).json({
         status:200,
         success:true,
         message:"notification removed"
     })
   } catch (error) {
     return res.status(500).json({
         status:500,
         success:false,
         message:error
     })
   }
}

export async function getNotification(req:Request,res:Response){
    try {
        const user=await fetchUserDetails(req)
        const notifications = await userSchema.findOne({_id: user.id})
                                          .populate({
                                              path: 'urgentNotifications',
                                                populate:{
                                                  path: 'user',
                                                  select:['name','contactNumber']
                                                }
                                           })
                                           .populate({
                                               path:'messageNotifications',
                                                 populate:{
                                                    path:'sender',
                                                    select:['name','contactNumber']
                                                 }
                                           })
                                           .select(['urgentNotifications',
                                              'messageNotifications' 
                                            ])
        return res.status(200).json({
            status:200,
            success:true,
            notifications
        })
                                        
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
} 