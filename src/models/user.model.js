
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ModelUser=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:30,
        minLength:5,
    },
    age:{
        type:Number,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       minLength:5,
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
   },
   passwordResetToken: {
    type: String,
},

passwordResetExpires: {
    type: Date,
},
})

const User=mongoose.model("user",ModelUser);
export default User;