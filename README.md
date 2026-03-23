# Job Application Tracker API

A REST API for tracking job applications built with Node.js, Express, PostgreSQL and Prisma.

I built this as a learning project after completing my first API (CineTrack) to practice 
more complex patterns like refresh tokens, Docker, testing, and CI/CD.

## What it does

- Register/login with JWT auth and refresh tokens
- Track job applications with status management (Applied → Interviewing → Offered → Accepted/Rejected)
- Schedule interviews with automatic email reminders
- Manage contacts per job application
- Dashboard with stats and upcoming interviews
- Filtering, sorting and pagination on job listings

## Tech Stack

Node.js, Express, PostgreSQL, Prisma, Docker, Zod, Jest, Supertest, Nodemailer, GitHub Actions

## Running locally

Make sure Docker is installed, then:
```bash
git clone https://github.com/AliAlomari04/jobTracking-API.git
cd job-tracker-api
cp .env.example .env
# fill in your .env values
docker compose up
```

## Running tests
```bash
npm test
```

## API Docs

Start the server and go to `http://localhost:8081/api-docs`
