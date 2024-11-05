const { z } = require('zod');
const userIdValidation= z.string().regex(/^[0-9a-fA-F]{24}$/,{message:'Invalid user id'});
const usernameValidation= z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/);
const passwordValidation= z.string().min(8).max(15);
const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: 'Full name must be at least 3 characters long',
    })
    .max(20, {
      message: 'Full name must be at most 20 characters long',
    })
    .regex(/^[a-zA-Z\s]*$/)
    .refine((data) => data.trim().split(" ").length > 1, {
      message: "Full name must contain first and last name",

    }),

  username: usernameValidation,

  email: z.string().email(),

  password: passwordValidation,
});
const signInSchema= z.object({
  username: usernameValidation,
  password: passwordValidation,
});
module.exports = {
  signUpSchema,
  signInSchema,
};