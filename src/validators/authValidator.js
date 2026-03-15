import { z } from 'zod'


export const registerSchema = z.object({
    name: z.string({
        required_error:"Name is required"
    }).min(3,"Name must be at least 3 characters long"),

    email:z.string({
        required_error:"Email is required"
    }).email("Invalid email format") ,

    password: z.string({
        required_error:"Password is required" 
    }).min(8,"At least 8 characters long").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,{message:"Must contain chars and letters!"})
})


export const loginSchema = z.object({
    email: z.string({
        required_error:"Email is required"
    }).email("Invalid email format") ,
    password:z.string({
        required_error:"Password is required"
    }).min(8)
})