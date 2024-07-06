import mongoose,{Document ,Schema} from 'mongoose'
interface AppointmentI extends Document{
    name:string,
    age:number,
    bloodGroup:string,
    userId:mongoose.Schema.Types.ObjectId,
    bloodBankId:mongoose.Schema.Types.ObjectId
    status:string
}

const Appointment:Schema<AppointmentI>=new mongoose.Schema({
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
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    bloodBankId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bloodBank'
    },
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    }
},{timestamps:true})

export default mongoose.model<AppointmentI>('Appointment',Appointment)