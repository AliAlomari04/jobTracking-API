import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validateMiddleware.js'
import { createJobSchema } from '../validators/jobValidator.js'
import { createJob, deleteJob, getJobById, getJobs, updateJob } from '../controllers/jobController.js'

const router = express.Router()
router.use(protect)
/**
 * @swagger
 * /jobs:
 *  get:
 *      summary: Get all jobs for current user
 *      tags: [Jobs]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: List of jobs retreived successfully
 */

router.get('/', getJobs)
/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               salarymin:
 *                 type: number
 *               salarymax:
 *                 type: number
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/',validate(createJobSchema), createJob)

/**
 * @swagger
 * /jobs/{id}:
 *  delete: 
 *    summary: delete a job
 *    tags: [Jobs]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200: 
 *          description: Job deleted successfully
 *      404:
 *          description: Job not found
 */

router.delete('/:id', deleteJob)

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a single job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Job retrieved successfully
 *       404:
 *         description: Job not found
 */


// Get a single job
router.get('/:id', getJobById)

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update an existing job
 *     tags: [Jobs]
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
 *               title:
 *                 type: string
 *               jobStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 */

router.put('/:id', updateJob)


export default router;


