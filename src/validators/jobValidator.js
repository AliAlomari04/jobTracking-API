import { z } from 'zod'


export const createJobSchema = z.object({
    title : z.string({
        required_error:"Job title is required"
    }).min(3),
    salarymin: z.number().positive("Min salary must be a positive number").optional(),
    salarymax: z.number().positive("Max salary must be a positive number").optional()
}).refine((data) =>{
    if(data.salarymin && data.salarymax){
        return data.salarymax> data.salarymin
    }
    return true
},{message:"Max salary must be greater than min salary"})