
import jwt from 'jsonwebtoken'


export const generateToken =  (userId,res) => {
    const payload = {id: userId}

    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '15m'
    })
    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '7d'
    })

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7*24*60*60*1000
    })
    return {accessToken,refreshToken}
}