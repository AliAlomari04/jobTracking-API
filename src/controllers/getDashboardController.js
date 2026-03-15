import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getDashboard = asyncHandler(async (req,res) => {
    
        const userId = req.user.id;


        // Job counts by stats
        const jobStats = await prisma.job.groupBy({
            by:['jobStatus'],   
            where:{userId},
            _count: true
        })

        const statsMap = {
            APPLIED: 0,
            INTERVIEWING:0,
            OFFERED:0,
            ACCEPTED:0,
            REJECTED:0
        }

        jobStats.forEach(stat => {
            statsMap[stat.jobStatus] = stat._count
        });

        // Upcoming interviews
        const [upcomingInterviews , recentJobs] = await Promise.all([
         prisma.interview.findMany({
            where:{
                job:{userId:userId},
                scheduledAt:{gte: new Date()}
            },
            orderBy: {scheduledAt:'asc'}
        }),
         prisma.job.findMany({
            where:{userId:userId},
            orderBy:{createdAt:'desc'},
            take:5
        })
        ])

        res.status(200).json({status:"Success",
            data:{
                stats:statsMap,
                upcomingInterviews,
                recentJobs
            }
        })
   
})