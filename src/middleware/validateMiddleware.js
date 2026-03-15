export const validate = (schema)=>{
    return(req,res,next)=>{
        const result = schema.safeParse(req.body);
        if(!result.success){
            const errMessage = result.error.issues.map((err)=> err.message)
            return res.status(400).json({
                status:"Fail",
                errMessage
            })
        }
        req.body = result.data
        next()
    }
}