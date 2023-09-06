import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Question name must be entered..."],
       
    },
    description:{
        type: String,
        required: [true, "Description must be entered..."],
        
    },
    category:{
        type:String,
        required:[true,'Question must have a category'],
        enum:['Array', 'Strings','LinkedList', 'Stacks', 'Queues', 'Trees', 'Others'],
    },
    difficulty:{
        type:String,
        required:[true,'Question must have a Difficuilty'],
        enum:['Easy', 'Medium','Hard'],
    },
    answers:[{
        type: mongoose.Schema.ObjectId,
        ref: "Answer"
    }],
    createdAt:{ 
        type:Date,
        default:Date.now()
    },
    timeLimit:{
        type:Number,
        default:10
    }
})

const Post = mongoose.model("Post", postSchema);
export default Post;
