import request from 'supertest'
import app from '../app.js'
import { prisma } from '../config/db.js'



const testUser = {
    name: "test robot" ,
    email: "test_robot@example.com",
    password: "Password123"
}



beforeAll(async () => {
    // connect
    await prisma.user.deleteMany();
    // await request(app).post('/api/auth/register').send(testUser)
})

afterAll(async () => {
    await prisma.user.deleteMany() // clean up
    await prisma.$disconnect()
})

describe('Jobs API', () => {
    it('dummy test to pass Jest', () => {
        expect(1).toBe(1);
    });
});

describe('Auth Routes', () => {
    // tests go here
    it('Should register a new user successfully !' , async () =>{
        const response= await request(app)
        .post('/api/auth/register')
        .send(testUser)

        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('accessToken')
    })

    it('Should fail to register if the email already exists ' , async () =>{
        const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch(/already exists/i)
    });

    it('Should fail to register if required fields are missing' , async () =>{
        const response = await request(app)
        .post('/api/auth/register')
        .send({
            name: "Incomplete user"
        })

        expect(response.statusCode).toBe(400)
    })


    // Login testing..
    it('Should login successfully and return a token' , async () =>{
        const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: testUser.email ,
            password: testUser.password
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.data).toHaveProperty('accessToken')
    })

    // Login , failing pass..
    it('Should fail to login if the password is incorrect' , async () =>{
        const response  = await request(app)
        .post('/api/auth/login')
        .send({
            email: testUser.email , 
            password: 'WorngPass123'
        })

        expect(response.statusCode).toBe(401)
    })


    // Login , Non-existing email..
    it('Should fail to login with a non-existent email' , async () =>{
        const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'ghost@example.com',
            password: 'Password123'
        })

        expect(response.statusCode).toBe(404)
    })
})