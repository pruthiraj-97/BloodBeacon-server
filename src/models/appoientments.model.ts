import mongoose,{ Document,Schema } from "mongoose";
interface appointmentI extends Document{
    name:string,
    age:number,
    bloodGroup:string,
    contactNumber:number,
    bloodBank:mongoose.Schema.Types.ObjectId
}

const appointmentSchema:Schema<appointmentI>=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    bloodGroup:{
        type:String,
        require:true
    },
    contactNumber:{ 
        type:Number,
        require:true
    },
    bloodBank:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bloodBank'
    }
})
module.exports=mongoose.model<appointmentI>('appointment',appointmentSchema)