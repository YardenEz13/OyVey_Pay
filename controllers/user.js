const { z }=require('zod');
const  { signUpSchema}= require('../lib/validation/user');
const User =require('../models/user')

const signUp= async(req,res)=>{
    try{
        const{ fullName,username,email,password}=signUpSchema.parse(req.body);
        console.log(req.body);
        return res.status(201).json({message: 'Created User Successfully' });
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