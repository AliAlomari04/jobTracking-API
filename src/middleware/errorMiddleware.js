export const notFound = (req,res,next) =>{
    const error = new Error(`Not found - ${req.originalUrl}`)

    res.status(404)
    next(error)
}

export const errorHandler = (err,req,res,next) =>{
    let statusCode = err.statusCode || (res.statusCode !== 200 ?   res.statusCode:500);
    let message = err.message;


    if(err.code === 'P2023'){
        statusCode= 404,
        message= "Resource not found or invalid ID"
    }

    res.status(statusCode).json({
        status:"error" ,
        message:message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}