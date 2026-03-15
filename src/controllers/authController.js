
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'
import { generateToken } from '../utils/generateToken.js'
import{ generateAccessToken }from '../utils/generateAccessToken.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import AppError from '../utils/AppError.js'



export const register = asyncHandler (async (req,res) => {
    let {email , name , password} = req.body;

    if(!email || !name || !password ){
        throw new AppError('All fields are required',400)
    }
    
        email= email.toLowerCase().trim();
        const existingUser = await prisma.user.findUnique({
            where:{email:email}
        })
        // console.log('existing user: ' , existingUser);
        
        if (existingUser) {
           throw new AppError('Email already exists',400)
            
        }
        const saltRounds = 10;
       const hashedPassword=  await bcrypt.hash(password , saltRounds)
        
        const createUser = await prisma.user.create({
            data:{
                email:email,
                name:name ,
                password:hashedPassword
            }
        })
        const {accessToken , refreshToken} = generateToken(createUser.id,res);
       await prisma.user.update({
        where:{id: createUser.id},
        data:{refreshToken}
       })
        res.status(201).json({
            status:"success",
            data:{
                User:{
                    id:createUser.id,
                    email:email,
                    name:name
                } ,
                accessToken
            }
        })
        
    
}
)

export const login = asyncHandler(async (req,res) => {
    let {email , password} = req.body;
    
        if(!email || !password){
           throw new AppError('Please enter email and password' , 400)
        }
        email=email.toLowerCase().trim()
        const userExists = await prisma.user.findUnique({
            where:{email:email}
        })
        if(!userExists){
           throw new AppError('User does not exist' , 404)
        }
        const match = await bcrypt.compare(password,userExists.password);
        if(!match){
           throw new AppError('Invalid email or password' , 401)
        }
        const {refreshToken , accessToken} = generateToken(userExists.id , res);
        await prisma.user.update({
            where:{id:userExists.id},
            data:{refreshToken}
        })
        res.status(200).json({
            status:"success",
            data:{
                user:{
                    id:userExists.id,
                    email
                },accessToken
            }
        })
    
})

export const refreshTokens = asyncHandler(async (req,res) => {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
       throw new AppError('Missing refresh tokens',401)
    }     const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
        where:{id:decoded.id}
    })
    if(!user || user.refreshToken !== refreshToken){
        throw new AppError("Can't access" , 403)
    }
    const newAccessToken = generateAccessToken(user.id)
    res.status(200).json({accessToken : newAccessToken})

   
})

export const logout = asyncHandler(async (req,res) => {
   
        const id = req.user?.id;
    if(!id){
        throw new AppError("No valid id",403)
    }
    await prisma.user.update({
        where:{id:id},
        data:{refreshToken:null}
    })
    res.clearCookie('refreshToken')
    res.status(200).json({message:"Logged out successfully"})
        
   
    
})

