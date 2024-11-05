const { userIdValidation } = require('../lib/validation/user');
const Income= require('../models/income');
const User= require('../models/user');
const {z}= require('zod');
const {incomeSchema,incomeIdValidation}= require('../lib/validation/income');
const addIncome= async(req,res)=>{
    try{
        const userId=userIdValidation.parse(req.params.userId);
        const {title,description,amount, tag, currency}= incomeSchema.parse(req.body);
        
        const userExists= await User.findById(userId);
        if(!userExists){
            return res.status(404).json({message:'User not found'});
        }
        const income= new Income({title,description,amount,tag,currency});
        await income.save();
        userExists.incomes.push(income);
        await userExists.save();
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