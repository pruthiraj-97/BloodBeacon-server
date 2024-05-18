import mongoose,{ Document,Schema } from "mongoose";
interface bloodBankI extends Document{
    name:string
    email:string
    contactNumber:number
    location:{
        type:'Point',
        coordinates:[number,number]
    }
    address:mongoose.Schema.Types.ObjectId,
    bloodGroups:Map<string,number>,
    appointments:mongoose.Schema.Types.ObjectId[]
}
const defaultBloodGroups = () => {
    return new Map([
        ['A+', 0],
        ['A-', 0],
        ['B+', 0],
        ['B-', 0],
        ['AB+', 0],
        ['AB-', 0],
        ['O+', 0],
        ['O-', 0]
    ]);
};
const bloodBankSchema:Schema<bloodBankI>=new mongoose.Schema({
     name:{
        type:String,
        require:true
     },
     email:{
        type:String,
        require:true
     },
     contactNumber:{
        type:Number,
        require:true
     },
     location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], 
        }
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address'
    },
    bloodGroups:{
        type: Map,
        of: String,
        default:defaultBloodGroups
    },
    appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appointment'
    }]
})

bloodBankSchema.index({ location: '2dsphere' });

const BloodBank=mongoose.model<bloodBankI>('bloodBank',bloodBankSchema)
export default BloodBank