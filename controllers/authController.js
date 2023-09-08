import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {promisify} from 'util';

const signToken = (id) =>{
    return jwt.sign({id},  process.env.JWT_SECRET,  {expiresIn:process.env.JWT_EXPIRES_IN });
}
   
const createSendToken = async(User,statusCode,res,req) =>{
 
    const token = signToken(User._id);
    const cookieOption = {    
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000 ),  
        secure : true,                                   
        httpOnly : true,
        sameSite : "none"                                     
    };

    if(req.secure){
        cookieOption.secure = true;
    }

    res.cookie('jwt',token,cookieOption)                

    User.password = undefined; 
    User.passwordConfirm = undefined; 

    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            User
        }
    });
};
   

export const signup = async(req,res)=>{
    try{
  
        const {name,email,password,passwordConfirm,year,enrollment} = req.body;
       
        
       
      
            if(password === passwordConfirm)
            { 
             
                const salt = await  bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                const passwordConfirmHash = await bcrypt.hash(passwordConfirm, salt);
          
                const newUser = await User.create({
                    name,
                    email,
                    year,
                    enrollment,
                    password: passwordHash,
                    passwordConfirm: passwordConfirmHash 
                });
                
                createSendToken(newUser,201,res,req)
            }
            else{
                return res.status(400).json({
                    status: 'failure',
                    message: 'Password and password confirmation do not match'
                });
            }
       


    }catch(err){
  
        res.status(404).json({
            status:'failure',
            message:'Something while sigging up.'
        })
        
    }
}



export const login = async(req,res)=>{
    
    try {
       
        const {email, password} = req.body;
        if(!email || !password){
            console.log("please provide your email address and password");
            return res.status(400).json({
                status: "failure",
                message: "Enter email and password..."
            })
        }
        

        const user = await User.findOne({email}).select('+password');


        if(!user){
          

            return res.status(404).json({
                status: "failure",
                message: "User does not exist..."
            })
        }
        const correctPassword = await bcrypt.compare(password,user.password);
        

        if(correctPassword){
           
            createSendToken(user,201,res,req);
        }
        else{
            console.log("please provide your correct email address and password");
            res.status(400).json({
                status: "failure",
                message: "Incorrect password..."
            })
        }
    } catch (err) {
        console.log(err.message);
    }
}

export const logout = async(req,res)=>{
    res.clearCookie('jwt');
    res.status(200).json({
        status: 'success'
    })
}


export const isLoggedIn = async (req,res)=>{   
    
  try {
    // 1) Verification of token
        if (req.cookies.jwt) {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            // 2) Check if the user still exists
            const currentUser = await User.findById(decoded.id);

            if (currentUser) {
            
                return res.status(200).json({
                    status:'success',
                    data:{
                        currentUser
                    }
                })
            
            }
                
        }
        else{
            return res.status(200).json({
                status:'failed',
                message:'Token not found'
            })
           
        }
        
    }catch (error) {
        return res.status(200).json({
            status:'failed',
            message:error.message
        })
};
    };       
    
   