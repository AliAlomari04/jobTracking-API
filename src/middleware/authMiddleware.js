import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';


export const protect = asyncHandler(async (req,res,next) => {
let token;
   
    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        const user = await prisma.user.findUnique({
            where:{id: decoded.id}
        })

        if(!user){
            throw new AppError("Not found" , 401)
        }
        req.user = user;

        next();
    } else{
        throw new AppError("No token provided.." , 401);
        
    }   
    
})