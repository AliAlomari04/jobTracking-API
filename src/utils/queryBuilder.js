export const buildJobQuery = (userId , queryParams) =>{
    const {status , source , startDate , endDate , sort,page,limit} = queryParams;

    const where = {userId}

    if(status){
        where.jobStatus= status.toUpperCase();
    }

    if(source){
        where.source = source.toUpperCase();
    }

    if(startDate || endDate){
        where.appliedAt = {}; //Setup 

        if(startDate){
            where.appliedAt.gte = new Date(startDate); // gte: bigger than or equal to
        }
        if(endDate){
            where.appliedAt.lte = new Date(endDate) //lte: Less or equal
        }
    }

    const orderBy = {
        appliedAt: sort === 'asc'?'asc':'desc'
    }
    const pageNumber = parseInt(page , 10) || 1
    const limitNumber=  parseInt(limit , 10)||10

    const skip = (pageNumber-1)*limitNumber
    const take = limitNumber

    return {where , orderBy,skip , take , page:pageNumber , limit:limitNumber}
} 