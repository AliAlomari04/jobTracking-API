import { PrismaClient } from '@prisma/client'

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === "development"? ["query","error","warn"]:["error"]
})

if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected via prisma");
        
    } catch (error) {
        console.log(`err in connecting to prisma ${error.message}`);
        process.exit(1)
    }
}


// const disconnectDB = async () => {
//     await prisma.$disconnect()
// }

export {prisma , connectDB }