const Income= require('../models/income');
const User= require('../models/user');
const {z}= require('zod');
const addIncome= async(req,res)=>{
    try{
        const userId= req.params.userId;
        const userExists= await User.findById(userId);
        if(!userExists){
            return res.status(404).json({message:'User not found'});
        }
        const {amount,description,date}= req.body;
        const newIncome= new Income({amount,description,date,userId});
        await newIncome.save();
        return res.status(200).json({message:'Income added successfully'});
    }
    catch(error){
        console.log(error);
        if(error instanceof z.ZodError){
            return res.status(400).json({message:error.errors[0].message});
        }
        return res.status(500).json({message:'internal server error'});
    }
}
module.exports={
    addIncome
}