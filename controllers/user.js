const { z }=require('zod');
const  { signUpSchema}= require('../lib/validation/user');
const User =require('../models/user')
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

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
      const token= jwt.sign(
        {
            id:newUser._id,
            username:newUser.username,
        },
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
      );
      res.cookie('token',token,
        {
            httpOnly:true,
            samesite:'strict',
            maxAge:24*60*60*1000,
        });
       return res.status(201).json({message:'User created successfully',token});
    }
    catch(error){
        console.log(error);

        if(error instanceof z.ZodError){
            return res.status(400).json({ message: error.errors[0].message});
        }
        return res.status(500).json({ message:'internal server error'});
    }
};

module.exports={
    signUp,
}