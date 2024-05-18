import mongoose,{ Document,Schema } from "mongoose";
interface requestMessageI extends Document{    
    message:string,
    bloodGroup:string,
    contactNumber?:number
}
const requestMessageSchema:Schema<requestMessageI>=new mongoose.Schema({
    message:{
        type:String,
        require:true
    },
    bloodGroup:{
        type:String,
        require:true
    },
    contactNumber:{
        type:Number
    }
},{timestamps:true})
export default mongoose.model<requestMessageI>('requestMessage',requestMessageSchema)