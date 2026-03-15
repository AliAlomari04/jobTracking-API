import { prisma } from '../config/db.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendEmail } from '../utils/sendEmail.js';


export const getInterview = asyncHandler(async (req,res) => {
   
        const {jobId} = req.params;
        const userId = req.user.id;

        const jobExists = await prisma.job.findFirst({
            where:{id:jobId , userId:userId}
        })
        if(!jobExists){
            throw new AppError("Not found",404)
        }

        const interviews = await prisma.interview.findMany({
            where:{jobId:jobId} ,
            orderBy:{scheduledAt:'asc'}
        })
        res.status(200).json({status:"Success" , data:{interviews}})
   
})
export const getInterviewById = asyncHandler(async (req,res) => {
    
        const {id} = req.params;
        const userId = req.user.id;

        const interview = await prisma.interview.findFirst({
            where:{
                id:id ,
                job:{userId:userId}
            },
            include:{job:{select:{title:true , companyId:true}}}
        })

        if(!interview){
            throw new AppError("Interview not found.." , 404);
            
        }

        res.status(200).json({status:"Success" , data:{interview}})
   
})

export const createInterview = asyncHandler(async (req,res) => {
    
         const {jobId} = req.params;
        const {interviewType , status , scheduledAt , duration , notes} = req.body;
        const userId = req.user.id;

        const jobExists = await prisma.job.findFirst({
            where:{id:jobId , userId:userId}
        })
        if(!jobExists){
          throw new AppError("Not found .." , 404)
        }

        const newInterview = await prisma.interview.create({
            data:{
            jobId,
             interviewType ,
              status ,
               scheduledAt : new Date(scheduledAt) , //Transforming it from string to date 
                duration ,
                 notes
            }
        })
        

         sendEmail({
            email:req.user.email ,
            subject:`reminder for interview ${jobExists.title}`,
            html:`
                    <h2>Interview Scheduled</h2>
                    <p>You have a new interview scheduled for <strong>${jobExists.title}</strong></p>
                <ul>
                    <li><strong>Type:</strong> ${interviewType}</li>
                    <li><strong>Date:</strong> ${new Date(scheduledAt).toLocaleString()}</li>
                    <li><strong>Duration:</strong> ${duration} minutes</li>
                    <li><strong>Notes:</strong> ${notes || 'None'}</li>
                </ul>
                    <p>Good luck!</p>
            `
        }).catch(err => console.error("Email failed: " , err.message));
        res.status(200).json({status:"Success" , data:{interview:newInterview}})
   
})

export const updateInterview = asyncHandler(async (req,res) => {
   
        const {id} = req.params;
        const userId = req.user.id;
        const {interviewType , status , scheduledAt , duration , notes} = req.body;

        const existingInterview = await prisma.interview.findFirst({
            where:{id:id , job:{userId:userId}} //bcz interview doesn't have a userId field 
        })
        if(!existingInterview){
            throw new AppError("Interview not found..",404);
            

        }
        const updatedInterview = await prisma.interview.update({
            where:{id:id},
            data:{interviewType , status , scheduledAt , duration , notes}
        })
        res.status(200).json({status:"Success" , data:updatedInterview})
  
})


export const deleteInterview =  asyncHandler(async (req,res) => {
    
        const{id} = req.params;
        const userId = req.user.id;

        const existingInterview = await prisma.interview.findFirst({
            where:{id:id , job:{userId:userId}}
        })
        if(!existingInterview){
           throw new AppError("Interview not found..",404);
           
        }

        await prisma.interview.delete({
            where:{id:id}
        })

        res.status(200).json({status:"Success" , message:"Interview deleted successfully.."})
 
})

