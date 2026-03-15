import jwt from 'jsonwebtoken'

export const generateAccessToken =  (userId ) => {
     const payload = {id: userId}
    
        const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m'
        })

        return accessToken
}