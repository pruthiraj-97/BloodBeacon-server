import { fromZodError } from "zod-validation-error";
import { Request, Response } from "express";
import { fetchUserDetails } from "../middleware/fetchUserDetails";
import { extractLocation } from "../config/extratLocation";
import { BloodBankI } from "../Types/BloodBank";
import BloodBank from "../models/BloodBank.model";
import userSchema from "../models/user.model";
import addressSchema from "../models/address.model";
export async function registerBloodBank(req:Request,res:Response){
    try {
        const bankDetails={
            name:req.body.name,
            email:req.body.email,
            contactNumber:parseInt(req.body.contactNumber),
            latitude:parseFloat(req.body.latitude),
            longitude:parseFloat(req.body.longitude)
        }
        const verifyData=BloodBankI.safeParse(bankDetails)
        if(!verifyData.success){
            return res.status(400).json({
                success:false,
                message:fromZodError(verifyData.error)
            })
        }
       const user=await fetchUserDetails(req)
       const address=await extractLocation(bankDetails.longitude,bankDetails.latitude)
       if(!address){
           return res.status(400).json({
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
            address:newAddress._id
        })
        await userSchema.updateOne({_id:user.id},{
            $set:{
                bloodBank:newBloodBank._id
            }
        })
        res.status(200).json({
            success:true,
            message:"blood bank registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}

export async function setBloodGroups(req:Request,res:Response){
    try {
        const id = req.params.id;
        const group = req.query.group;
        const count=req.query.count
        if (!group || typeof group !== 'string'|| !count || typeof count !== 'string') {
            return res.status(400).json({
                success: false,
                message: "cheak your group and count of bloodgroup"
            });
        }
        const bloodBank = await BloodBank.findById(id);
        if (!bloodBank) {
            return res.status(404).json({
                success: false,
                message: "Blood bank not found"
            });
        }
        const bloodGroups = bloodBank.bloodGroups;
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
            success: true,
            message: "blood group updated successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
}

export async function getBloodBank(req:Request,res:Response){
    try {
        const id=req.params.id
        console.log(id)
        const bloodBank=await BloodBank.findOne({_id:id})
                                 .populate({
                                    path:'address',
                                 })
        console.log(bloodBank)
        return res.status(200).json({
            success:true,
            bloodBank:bloodBank
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}