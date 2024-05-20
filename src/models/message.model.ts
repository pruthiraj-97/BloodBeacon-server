import mongoose,{ Document,Schema, mongo } from "mongoose";
interface messageI extends Document{
    message:string
    sender:mongoose.Schema.Types.ObjectId
    receiver:mongoose.Schema.Types.ObjectId
    conversation:mongoose.Schema.Types.ObjectId
}
const messageSchema=new mongoose.Schema<messageI>({
    message:{
        type:String,
        require:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conversation'
    }
})
export default mongoose.model<messageI>('message',messageSchema)