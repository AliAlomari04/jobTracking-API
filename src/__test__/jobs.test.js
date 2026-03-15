import request from 'supertest'
import app from '../app.js'
import { prisma } from '../config/db.js'


let authToken = '';
let createdJobId = '';

const testUser = {
    name: "Job tester" , 
    email: "job_tester@example.com",
    password: "Password123"
}

const dummyJob = {
    title: "Software engineer",
    company:"Google" ,
    jobStatus: "APPLIED"
}



beforeAll(async () => {
    await prisma.user.deleteMany()
    await prisma.job.deleteMany()

    await request(app).post('/api/auth/register').send(testUser)

    const loginResponse = await request(app)
    .post('/api/auth/login').send({
        email: testUser.email,
        password: testUser.password
    })
    authToken = loginResponse.body.data.accessToken
})

afterAll(async () => {
    await prisma.job.deleteMany()
    await prisma.user.deleteMany()
    await prisma.$disconnect()
})

describe('Jobs API Routes' , ()=>{
        // 1. Creating a job successfully..
        it('Should create a job successfully' , async () =>{
            const response = await request(app)
            .post('/api/jobs')
            .set('Authorization' , `Bearer ${authToken}`)
            .send(dummyJob)

            expect(response.statusCode).toBe(201)
            expect(response.body.status).toBe('Success')

            createdJobId = response.body.data.job.id;
            expect(createdJobId).toBeDefined()
        })

        // 2.Return list of jobs
        it('Should return a list of jobs' , async () =>{
            const response = await request(app)
            .get('/api/jobs')
            .set('Authorization' , `Bearer ${authToken}`)

            expect(response.statusCode).toBe(200)
        })

        // 3. Return a single Job (:/id)
        it('Should return a single job' , async () =>{
            const response = await request(app)
            .get(`/api/jobs/${createdJobId}`)
            .set('Authorization', `Bearer ${authToken}`)

            expect(response.statusCode).toBe(200)
            expect(response.body.data.job.id).toBe(createdJobId)
        })

        // 4. Update a job
        it('Should update a job' , async () =>{
            const updatedData = {jobStatus: "INTERVIEWING"}


            const response = await request(app)
            .put(`/api/jobs/${createdJobId}`)
            .set('Authorization' , `Bearer ${authToken}`).send(updatedData)

            expect(response.statusCode).toBe(200)
            expect(response.body.data.job.jobStatus).toBe("INTERVIEWING")
        })

        // 5. Delete a job
        it('Should delete a job' , async ()=>{
            const response = await request(app)
            .delete(`/api/jobs/${createdJobId}`)
            .set('Authorization' , `Bearer ${authToken}`)

            expect(response.statusCode).toBe(200)
        })
})