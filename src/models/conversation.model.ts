import mongoose,{ Document,Schema } from "mongoose";
interface conversationI extends Document{
    members:[mongoose.Schema.Types.ObjectId]
    messages:[mongoose.Schema.Types.ObjectId]
}
const conversation=new mongoose.Schema<conversationI>({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'message'
        }
    ]
})
export default mongoose.model<conversationI>('conversation',conversation)