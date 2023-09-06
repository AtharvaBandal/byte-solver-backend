import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'Post'
    },
    text:{
        type:String,
        require:[true,'Answer is required'],
    },
    status:{
       type:String,
       enum:['correct', 'incorrect','pending'],
       default:'pending'
    },
    answeredAt:{
        type:Date,
        default:Date.now()
    },
    language:{
        type:String,
        require:[true,'Language is required']
    },
    active:{
        type:Boolean,
        default:true,
        select:false
      }


});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
