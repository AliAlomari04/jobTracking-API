import { prisma } from '../config/db.js'
import { isValidStatusTransition } from '../utils/jobStatusValidator.js'
import { buildJobQuery } from '../utils/queryBuilder.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';


export const createJob = asyncHandler(async (req,res) => {
    
        const {title,companyId  , description , source , salarymin , salarymax , joburl , notes} = req.body;
        const userId = req.user.id

        const newJob = await prisma.job.create({
            data:{
                title ,   description,source , salarymin , salarymax ,  joburl , notes , userId, ...(companyId &&{companyId})
            }
        })
        // companyId
        res.status(201).json({
            status:"Success" , data:{job:newJob} 
        })
   
})

export const getJobs = asyncHandler (async (req,res) => {
    
         const userId = req.user.id
         const {where , orderBy,skip , take , page , limit} = buildJobQuery(userId , req.query)


    const [jobs,totalJobs]= await Promise.all([prisma.job.findMany({
        where:where,
        orderBy:orderBy,
        skip:skip , 
        take: take
    }),
    prisma.job.count({where})
])

    res.status(200).json({status:"Success", data:{job:jobs,
        pagination:{
            totalItems: totalJobs ,
            currentPage: page , 
            pageSize: limit ,
            totalPages: Math.ceil(totalJobs / limit)
        }
    }})
   
})

export const getJobById = asyncHandler(async (req,res) => {
    
        const {id} = req.params;
        const userId = req.user.id;

        const job = await prisma.job.findFirst({
            where:{id:id , userId:userId}
        })

        if(!job){
            throw new AppError("Job not found",404)
        }

        res.status(200).json({status:"Success" , data:{job}})
    
})

export const updateJob = asyncHandler(async (req,res) => {
   
        const {id} = req.params;
        const userId = req.user.id;

        const {title,jobStatus , description , source , salarymin , salarymax , joburl , notes} = req.body

        const existingJob = await prisma.job.findFirst({
            where:{id:id , userId:userId}
        })
        if(!existingJob){
           throw new AppError("Job not found or unauthorized",404);
           
        }
        if (jobStatus){
            const isValid = isValidStatusTransition(existingJob.jobStatus , jobStatus)

            if(!isValid){
                throw new AppError(`Invalid status transition , Can't change Job from ${existingJob.jobStatus} to ${jobStatus}`,400);
            }
        }

        

        const updatedJob = await prisma.job.update({
            where:{id:id},
            data:{title,jobStatus , description , source , salarymin , salarymax , joburl , notes}
        })

        res.status(200).json({status:"Success" , data:{job:updatedJob}})
   
})


export const deleteJob = asyncHandler(async (req,res) => {
    
        const {id} = req.params;
        const userId = req.user.id;

        const existingJob = await prisma.job.findFirst({
            where:{id:id , userId:userId}
        })
        if(!existingJob){
            throw new AppError("No jobs found",404)
        }

        await prisma.job.delete({
            where:{id:id}
        })
        
        res.status(200).json({status:"Success" , message:"Job deleted successfully.."})
   
})