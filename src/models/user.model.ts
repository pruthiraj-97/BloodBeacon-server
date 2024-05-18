import mongoose,{ Document,Schema } from "mongoose";
interface userI extends Document{
    name:string,
    email:string,
    password:string,
    contactNumber:number,
    bloodGroup:string,
    location:{
        type:'Point',
        coordinates:[number,number]
    }
    requestMessages:mongoose.Schema.Types.ObjectId[],
    bloodBank?:mongoose.Schema.Types.ObjectId,
    isVarified:boolean,
    varificationCode:number
}

// Note use of document
//Document is a class that represents a single document in a MongoDB collection. 
// That inharited the property like _id,createdAt,updatedAt.and methods like save,remove,etc. for the use of Document.

const userSchema:Schema<userI>=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   email:{
    type:String,
    require:true
   },
   password:{
    type:String,
    require:true
   },
   contactNumber:{
    type:Number,
    require:true
   },
   bloodGroup:{
    type:String,
    require:true
   },
   location:{
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number]
    }
   },
   requestMessages:[
    {
       type:mongoose.Schema.Types.ObjectId,
       ref:"requestMessage"
    }
  ],
  isVarified:{
    type:Boolean,
    default:false
  },
  varificationCode:{
    type:Number,
    required:true
  }
},{timestamps:true})

userSchema.index({ location: '2dsphere' });

const User = mongoose.model<userI>('User', userSchema);
export default User

