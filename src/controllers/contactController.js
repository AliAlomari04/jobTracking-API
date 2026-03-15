import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const createContact = asyncHandler (async (req,res) => {
        const {jobId , name , email , phone , role , linkedin , notes} = req.body;
        const userId= req.user.id;

        const jobExist = await prisma.job.findFirst({
            where:{id:jobId , userId:userId}
        })
        if(!jobExist){
            throw new AppError("Job not found!" , 404);
            
        }

        const newContact = await prisma.contact.create({
            data:{
                jobId ,
                name , 
                email , 
                phone , 
                role ,
                linkedin , 
                notes
            }
        })

        res.status(200).json({status:"Success" , data:{newContact}})
   
})
export const getContacts = asyncHandler(async (req,res) => {
    
        const {jobId} = req.params;
        const userId = req.user.id


        const jobExists = await prisma.job.findFirst({
            where:{id:jobId , userId:userId}
        })

        if(!jobExists){
            throw new AppError("Job not found!" , 404);
            
        }

        const contacts = await prisma.contact.findMany({
            where:{jobId:jobId}
        })

        res.status(200).json({status:"Success" , data:{contacts}})
  
})


export const getContactById = asyncHandler(async (req,res) => {
    
        const{id} = req.params;
        const userId = req.user.id;

        const contact = await prisma.contact.findFirst({
            where:{
                id:id ,
                job:{userId:userId}
            }
        })
        if(!contact){
           throw new AppError("Contact not found" , 404);
           
        }
        res.status(200).json({status:"Success" , data:{contact}})

  
})


export const updateContact = asyncHandler(async (req,res) => {
    
        const{id} = req.params;
        const userId = req.user.id;
       const { name , email , phone , role , linkedin , notes} = req.body;

        const contactExist = await prisma.contact.findFirst({
            where:{id:id,
                job:{userId:userId}
            }
        })
        if(!contactExist){
            throw new AppError("Contact not found" , 404);
            
        }

        const updatedContact = await prisma.contact.update({
            where:{id:id},
            data:{name , email , phone , role , linkedin , notes}
        })


        res.status(200).json({status:"Success" , data:{updatedContact}})
    
})

export const deleteContact = asyncHandler (async (req,res) => {
   
        const {id} = req.params;
        const userId = req.user.id;

        const contactExist = await prisma.contact.findFirst({
            where:{id:id , job:{userId:userId}}
        })
        if(!contactExist){
            throw new AppError("Contact not found" , 404);
            
        }

        await prisma.contact.delete({
            where:{id:id}
        })

        res.status(200).json({status:"Success" , message:"Contact deleted successfully"})
    
})