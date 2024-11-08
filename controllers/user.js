const { z }=require('zod');
const  { signUpSchema,signInSchema}= require('../lib/validation/user');
const User =require('../models/user')
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const {setTokenCookie}= require('../lib/utils');
const signUp= async(req,res)=>{
    try{
        const{ fullName,username,email,password}=signUpSchema.parse(req.body);

       const UsernameExists= await User.findOne({username});
       if(UsernameExists){
        return res.status(400).json({message:'Username already exists'});
       }
       const EmailExists= await User.findOne({email});
       if(EmailExists){
        return res.status(400).json({message:'Email already exists'});
       }
       const hashedPassword= await bcrypt.hash(password,10);
       const user= new User({
        fullName,
        username,
        email,
        password:hashedPassword
    });
       const newUser= await user.save();
       if(!newUser){
        return res.status(400).json({message:'Failed to create user'});
       }
       setTokenCookie(res,newUser,process.env.JWT_SECRET);
       return res.status(201).json({message:'User created successfully'});
    }
    catch(error){
        console.log(error);

        if(error instanceof z.ZodError){
            return res.status(400).json({ message: error.errors[0].message});
        }
        return res.status(500).json({ message:'internal server error'});
    }
};
const signIn= async(req,res)=>{
try{
    const{username,password}=signInSchema.parse(req.body);
        const user= await User.findOne({username});
        if(!user){
            return res.status(400).json({message:'Invalid username or password'});
        }
        const passwordMatch= await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message:'Invalid username or password'});
        }
        setTokenCookie(res,user,process.env.JWT_SECRET);
        return res.status(200).json({message:'Sign in successful'});
}
catch(error){
    console.log(error);
}
if(error instanceof z.ZodError){
    return res.status(400).json({message:error.errors[0].message});
}
return res.status(500).json({message:'internal server error'});
}
const signOut= async(req,res)=>{
    try{
    res.clearCookie('token');
    return res.status(200).json({message:'Sign out successful'});
}
catch(error){
    console.log(error);
    return res.status(500).json({message:'internal server error'});
}
}
module.exports={
    signUp,signIn,signOut
}