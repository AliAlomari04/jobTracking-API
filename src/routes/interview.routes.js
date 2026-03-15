import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { createInterview , getInterview , getInterviewById , updateInterview , deleteInterview } from '../controllers/interviewController.js'


const router = express.Router()

router.use(protect);

/**
 * @swagger
 * /interviews/job/{jobId}:
 *   post:
 *      summary: Create an interview for a job
 *      tags: [Interviews]
 *      security: 
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: 
 *                     - jobId
 *                   properties:
 *                      jobId:
 *                        type: string
 *                      interviewType:
 *                        type: string
 *                      scheduledAt:
 *                        type: string
 *                        format: date-time
 *                      duration:
 *                        type: number
 *                      notes: 
 *                        type: string
 *      responses:
 *          201:
 *              description: Interview created successfully
 *          404:
 *              description: Job not found
 */

router.post('/job/:jobId' , createInterview);


/**
 * @swagger
 * /interviews/job/{jobId}:
 *   get:
 *     summary: Get all interviews for a specific job
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interviews retrieved successfully
 */


// We use /job/:jobId to differ between it and between get a single interview..
router.get('/job/:jobId' , getInterview)

/**
 * @swagger
 * /interviews/{id}:
 *   get:
 *     summary: Get a single interview by ID
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interview retrieved successfully
 */

router.get('/:id' , getInterviewById)

/**
 * @swagger
 * /interviews/{id}:
 *   put:
 *     summary: Update an interview
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Interview updated successfully
 */

router.put("/:id" , updateInterview)

/**
 * @swagger
 * /interviews/{id}:
 *   delete:
 *     summary: Delete an interview
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interview deleted successfully
 */

router.delete('/:id' , deleteInterview)

export default router