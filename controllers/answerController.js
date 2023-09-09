import Answer from '../models/Answer.js';
import User from '../models/User.js';

const checkRole = async(email)=>{
   
    const user = await User.findOne({email});
  
    if(user.roles === 'user'){
        return false;
    }
    return true;

}


//------------------------------------------------------------------------------------------------

export const submitAnswer = async(req,res,next) => {

    
    const {post,text,language,postCreatedAt,timeLimit} = req.body;
    const userId = req.params.userId
    if(!text&&!language){
        return res.status(400).json({
            status:'failed',
           message:'fill all required fields'

        });
    }

    // if(Date.now() > postCreatedAt+1000*60*timeLimit) {
    //     res.status(400).json({
    //         status:'failed',
    //        message:'Time limit exceeded'

    //     });
    // }
    const answer = await Answer.create({user:userId,post,text,language});
   

    if(answer){
        const user_updated = await User.findByIdAndUpdate(
            { _id: userId }, 
            { $push: { answers: answer._id } },
            { new: true }
          );
       
        res.status(200).json({
            status:'success',
            data:{
                user: user_updated,
                answer
            }

        });
    

       
    }
    else{ 
        res.status(400).json({
            status:'failed',
           message:'Not created try again'

        });
    }
}

export const getAllAnswers=async(req,res,next) => {
    // const quesId  = req.body
    const quesId=req.params.quesId;
    
    const answers = await Answer.find({post: quesId}).populate('user')
    

    if(answers){
        res.status(200).json({
            status:'success',
            data:{
                answers
            }

        });
    }
    else{
        res.status(404).json({
            status:'failed',
           message:'Not found'

        });
    }
}

export const getAnswers_user = async (req, res, next) => {
    if (!req.params.userId) {
        return res.status(404).json({
            status: 'failure',
            message: 'userId not found',
        });
    }

    try {
        const answers = await Answer.find({ user: req.params.userId });

        if (answers) {
            return res.status(200).json({
                status: 'success',
                data: {
                    answers,
                },
            });
        } else {
            return res.status(404).json({
                status: 'failure',
                message: 'No answers found for the user',
            });
        }
    } catch (error) {
        // Handle any potential errors here
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

//------------------------------------------------------------------------------------------------
export const giveStatus=async(req,res,next) => {
    
    if(! await checkRole(req.body.email)){
        
       return res.status(404).json({
            status:'failure',
            message:'you are not allowed to access give status',
            
        })
    }
    const ans = await Answer.findById(req.params.ansId)
    if(!ans){
        return res.status(404).json({
            status:'failure',
            message:'Answer not found',
            
        })
    }
    
    
    if(ans.status!='pending')
    {
        return res.status(400).json({
            status:'failure',
            message:'aproved answers are not allowed to give status',
            
        })
    }

    ans.status = req.body.status;

   const updatedAnswer = await ans.save();
    
    if(updatedAnswer){
        
       
        res.status(200).json({
            status:'success',
            data:{
                updatedAnswer
            }
        })
    }
    else{
        res.status(404).json({
            status:'failed',
            message:'something went wrong'
        })
    }

}


export const deleteAnswer = async(req, res, next) => {
    if( !await checkRole(req.body.email)){
        return res.status(404).json({
            status:'failure',
            message:'you are not allowed to access deleteAnswer route',
            
        })
    }
    const ans = await Answer.findById(req.params.ansId)
    if(!ans){
        return res.status(404).json({
            status:'failure',
            message:'Answer not found to delete',
            
        })
    }

    else{

        await Answer.findByIdAndDelete(req.params.ansId);

        return res.status(200).json({
             status:'success',
             message:'Answer deleted'
         })
     
     }
}



export const updateAnswer =async(req,res,next)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    const answer = await Answer.findById(req.params.ansId);

    
    if(answer.user!=user._id){
       return res.status(400).json({
            status:'failed',
            message:'you cannot update your answer'
        });

    }



    if(answer.status!='pending')
    {
        res.status(400).json({
            status:'failed',
            message:'Cannot update answer after checking'
        });
    }
    else{
        const {text,language} = req.body;
        let updatedAnswer = await Answer.findByIdAndUpdate(req.params.ansId, { text, language });
        
        res.status(200).json({
            status:'success',
            data:{
                updatedAnswer
            }
        });

    }


}

