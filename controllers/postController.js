import  Post  from "../models/Post.js";
import User from "../models/User.js";

const checkRole = async(email)=>{

    const user = await User.findOne({email});
   
    if(user.roles === 'user'){
        return false;
    }
    return true;

}

export const createPost = async(req,res,next)=>{
    try{

        const {name,description,category,difficulty,email} = req.body;
        // console.log({name,description,category});

        if( !await checkRole(email)){
             return res.status(404).json({
                status:'failure',
                message:'you are not allowed to create a post',
                
            })
        }
    const newPost = await Post.create({
        name,
        description,
        category,
        difficulty
    });

    res.status(200).json({
        status:'success',
        data:{
            newPost
        }
    })
    }catch(err){
        console.log(err);
        return res.status(404).json({
            status:'failure',
            message:'Please fill all the required fields',
            
        })
    }

}

export const getAllPost = async (req, res, next) => {
    try {
        
        const posts = await Post.find();
        
        if (posts) {
            res.status(200).json({
                status: 'success',
                data: {
                    posts
                }
            });
        } else {
            res.status(404).json({
                status: 'failure',
                message: 'No posts found',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


export const getPost= async(req,res,next)=>{
    const post = await Post.findById(req.params.postId);
    if(post){
        res.status(200).json({
            status:'success',
            data:{
                post
            }
        })

    }

    else{
        res.status(404).json({
            status:'failure',
            message:'Post not found',
        })
    }

}

export const deletePost = async(req,res,next)=>{

    if( !await checkRole(req.body.email)){
        
        return res.status(404).json({
            status:'failure',
            message:'you are not allowed to access deletePost',
            
        })
    }

    const post = await Post.findById(req.params.postId)
   if(!post) 
   {    return res.status(404).json({
        status:'failure',
        message:'Post not found to delete',
        })
    }
    else{
       await Post.findByIdAndDelete(req.params.postId);

    
        return res.status(200).json({
            status:'success',
            message:'Post deleted'
        })
    
    }


    

}

export const updatePost = async(req,res,next)=>{
    if( !await checkRole(req.body.email)){
        return res.status(404).json({
            status:'failure',
            message:'you are not allowed to access',
            
        })
    }
    
    const {name,description,category} = req.body;
    
        const post = await Post.findById(req.params.postId);

        if(!post) 
       {    return res.status(404).json({
            status:'failure',
            message:'Post not found to Update',
            })
       }
       else{

            await Post.findByIdAndUpdate(req.params.postId,{name:name,description:description,category:category});
                return res.status(200).json({
                status:'success',
                message:'Post Updated'
            })
        
        }


       

    
}