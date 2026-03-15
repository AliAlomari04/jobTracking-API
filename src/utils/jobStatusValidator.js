export const isValidStatusTransition = (currentStatus , newStatus)=>{
    const allowedTransitions = {
        APPLIED:['INTERVIEWING'],
        INTERVIEWING:['OFFERED'],
        OFFERED:['ACCEPTED','REJECTED'],
        ACCEPTED:[],
        REJECTED:[]
    }
    if(allowedTransitions[currentStatus].includes(newStatus)){
        return true;
    }

    return false;
}