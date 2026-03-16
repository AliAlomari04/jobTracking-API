import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import { errorHandler , notFound } from './middleware/errorMiddleware.js'
import authRoutes from './routes/auth.routes.js'
import jobRoutes from './routes/job.routes.js'
import contactRoutes from './routes/contact.routes.js'
import interviewRoutes from './routes/interview.routes.js'
import getDashboardroutes from './routes/dashboard.routes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import ratelimit from 'express-rate-limit'

dotenv.config();
const app = express();

app.use(helmet())

const apiLimiter = ratelimit({
    windowMs:15*60*1000,
    max:100,
    message:{
        status:"Fail",
        message:"Too many requests , pls try again later"
    },
    standardHeaders:true,
    legacyHeaders:false
})

app.use('/api',apiLimiter)

const authLimiter = ratelimit({
    windowMs:15*60*1000,
    max:20,
    message:{
        status:"fail",
        message:"Too many attempts , try again later"
    }
})


app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(swaggerSpec))
app.use('/api/auth' , authLimiter)

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/interviews' , interviewRoutes)
app.use('/api/contacts' , contactRoutes)
app.use('/api/dashboard' , getDashboardroutes)



// error handling
app.use(notFound);
app.use(errorHandler)



export default app;