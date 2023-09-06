import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "User name must be entered..."],
        unique: true,
        trim: true,
        max: 20
    },
    email:{
        type: String,
        required: [true, "email name must be entered..."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid email..."],
    },
    password:{
        type:String,
        required: [true, "password must be entered..."],
        minLength: 4,
        select: false,
    },
    passwordConfirm:{
        type:String,
        required: [true, "Confirm password must be entered..."],
        minLength: 4,
        select: false,
        
    },
    roles:{
        type:String,
        enum:['user','admin','member'],
        default: "user"
    },
    year:{
        type:String,
        required: [true, "year must be entered"],
        max: 10
    },
    enrollment:{
        type:String,
        required: [true, "enrollment number must be entered"],
        max: 25
    },
    answers:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Answer'
    }],
    post:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }],
    
})

const User = mongoose.model("User", userSchema);

export default User;