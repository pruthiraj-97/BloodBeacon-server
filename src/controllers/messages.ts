import { Response,Request } from "express-serve-static-core";
import messageSchema from "../models/message.model";
import conversationSchema from "../models/conversation.model";
import { fetchUserDetails } from "../middleware/fetchUserDetails";
import { messageI } from "../Types/message";
import {z} from 'zod'
import { fromZodError } from "zod-validation-error";
import { dataValidationError } from "../config/dataValidationError";
export async function sendMessage(req:Request,res:Response){
   try {
      const user=await fetchUserDetails(req)
      const messageType={
        receiver:req.params.id,
        message:req.body.message,
        sender:user.id
      }
      const result=messageI.safeParse(messageType)
      if(!result.success){
          const response=fromZodError(result.error)
          const message=dataValidationError(response.details)
          return res.status(400).json({
              success:false,
              message:message
          })
      }
      const message=await messageSchema.create(messageType)
      let conversation=await conversationSchema.findOne({
        members: {
          $all: [messageType.sender, messageType.receiver]
        }
      })
      if(!conversation){
          conversation=await conversationSchema.create({
            members:[messageType.sender,messageType.receiver],
            messages:[]
          })
      }
      await conversationSchema.updateOne({
        _id:conversation?._id
      },{
        $push:{
            messages:message._id
        }
      })
      return res.status(200).json({
        success:true,
        message:'message sent successfully'
      })
   } catch (error) {
      return res.status(500).json({
        success:false,
        message:error
      })
   }
}
export async function getMessage(req:Request,res:Response){
    try {
        const user=await fetchUserDetails(req)
        const id=req.params.id
        if(!id){
            return res.status(400).json({
                success:false,
                message:'please provide id'
            })
        }
        const conversations=await conversationSchema.findOne({
            $in:{
                members:[user.id,id]
            }
        })
        return res.status(200).json({
            success:true,
            messages:conversations
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}