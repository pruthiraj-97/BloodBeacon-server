import { fromZodError } from "zod-validation-error";
import { Request, Response } from "express";
import { fetchUserDetails } from "../middleware/fetchUserDetails";
import { extractLocation } from "../config/extratLocation";
import { BloodBankI } from "../Types/BloodBank";
import BloodBank from "../models/BloodBank.model";
import userSchema from "../models/user.model";
import addressSchema from "../models/address.model";
import { dataValidationError } from "../config/dataValidationError";
export async function registerBloodBank(req:Request,res:Response){
    try {
        const bankDetails={
            name:req.body.name,
            email:req.body.email,
            contactNumber:parseInt(req.body.contactNumber),
            latitude:parseFloat(req.body.latitude),
            longitude:parseFloat(req.body.longitude)
        }
        console.log(bankDetails)
        const verifyData=BloodBankI.safeParse(bankDetails)
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
       const address=await extractLocation(bankDetails.longitude,bankDetails.latitude)
       if(!address){
           return res.status(400).json({
               status:400,
               success:false,
               message:"location not found"
           })
       }
       const newAddress=await addressSchema.create(address)
       const newBloodBank=await BloodBank.create({
            name:bankDetails.name,
            email:bankDetails.email,
            contactNumber:bankDetails.contactNumber,
            location:{
                type:'Point',
                coordinates:[bankDetails.longitude,bankDetails.latitude]
            },
            address:newAddress._id,
            owner:user.id
        })
        console.log(newBloodBank)
        await userSchema.updateOne({_id:user.id},{
            $set:{
                bloodBank:newBloodBank._id
            }
        })
        const bloodBank=await BloodBank.findOne({_id:newBloodBank._id})
                                       .populate('address')
        res.status(200).json({
            status:200,
            success:true,
            message:"blood bank registered successfully",
            bloodBank:bloodBank
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export async function setBloodGroups(req:Request,res:Response){
    try {
        const id = req.params.id;
        const group = req.body.group;
        const count=req.body.count
        console.log(group,count)
        if (!group || typeof group !== 'string'|| !count || typeof count !== 'string') {
            return res.status(400).json({
                success: false,
                message: "cheak your group and count of bloodgroup"
            });
        }
        const bloodBank = await BloodBank.findOne({ _id: id });
        if (!bloodBank) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Blood bank not found"
            });
        }
        const bloodGroups = bloodBank.bloodGroups;
        console.log(bloodGroups)
        if (!bloodGroups.has(group)) {
            return res.status(400).json({
                success: false,
                message: "group not found in your blood bank"
            });
        }
        bloodGroups.set(group,parseInt(count))
        await BloodBank.updateOne({ _id: id },
           {
            $set:{
                bloodGroups:bloodGroups
            }
           });
        return res.status(200).json({
            status: 200,
            success: true,
            message: "blood group updated successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "An error occurred"
        });
    }
}

export async function getBloodBank(req:Request,res:Response){
    try {
        const user=await fetchUserDetails(req)
        const bloodBank=await BloodBank.findOne({owner:user.id})
                                 .populate({
                                    path:'address',
                                 })
        console.log(bloodBank)
        return res.status(200).json({
            status:200,
            success:true,
            bloodBank:bloodBank
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}