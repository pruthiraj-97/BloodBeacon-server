import { Request,Response } from "express";
import BloodBankSchema from "../models/BloodBank.model";
import { calculateDistance } from "../config/calculatedistance";
export async function serchNearbyBloodBank(req:Request,res:Response) {
     try {
        const longitude=parseFloat(req.body.longitude)
        const latitude=parseFloat(req.body.latitude)
        if(!longitude || !latitude){
            return res.status(400).json({
                success:false,
                message:"Your location not found"
            })
        }
        const bloodGroup=req.body.bloodGroup
        const distance=parseInt(req.body.distance)||20
        const bloodBanks=await BloodBankSchema.find()
                                               .populate('address')
        let searchBloodBanks:any=[]
        bloodBanks.forEach((bloodbank)=>{
            const bloodGroups=bloodbank.bloodGroups
            if(bloodGroups.get(bloodGroup)==0){
                return
            }
            let coordinate=bloodbank.location.coordinates
            const fetchDistance=calculateDistance(longitude,latitude,coordinate[0],coordinate[1])
            if(fetchDistance<distance){
                searchBloodBanks.push({
                    bloodbank:bloodbank,
                    distance:fetchDistance
                })
            }
        })
        searchBloodBanks.sort((a:any,b:any)=>a.distance-b.distance)
        return res.status(200).json({
            success:true,
            searchBloodBanks:searchBloodBanks
        })
     } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
     }
}