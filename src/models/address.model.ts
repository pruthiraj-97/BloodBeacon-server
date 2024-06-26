import mongoose,{ Document,Schema } from "mongoose";
interface addressI extends Document{
    region:string
    state:string
    country:string
    postcode:number
}
const addressSchema:Schema<addressI>=new mongoose.Schema({
    region:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    }
},{timestamps:true})
export default mongoose.model<addressI>('address',addressSchema)