
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    createContact, 
    getContactById, 
    updateContact, 
    deleteContact, 
    getContacts
} from '../controllers/contactController.js';

const router = express.Router();


router.use(protect);

/**
 * @swagger
 * /contacts:
 *  post:
 *    summary: Create a contact to a job
 *    tags: [Contacts]
 *    security: 
 *      -bearerAuth: []
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *              type: object
 *              required:
 *                - jobId
 *                - name
 *              properties:
 *                jobId:
 *                 type: string
 *                name:
 *                 type: string
 *                email:
 *                 type: string
 *                phone:
 *                 type: string
 *                role:
 *                 type: string
 *                linkedIn:
 *                 type: string
 *                notes:
 *                 type: string
 *    responses:
 *       200:
 *          description: Contact created successfully
 */

router.post('/', createContact);
/**
 * @swagger
 * /contacts/job/{jobId}:
 *   get:
 *     summary: Get all contacts for a specific job
 *     tags: [Contacts]
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
 *         description: Contacts retrieved successfully
 */
router.get('/job/:jobId', getContacts);
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact
 *     tags: [Contacts]
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
 *         description: Contact retrieved successfully
 */
router.get('/:id', getContactById);
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 */
router.put('/:id', updateContact);
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
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
 *         description: Contact deleted successfully
 */
router.delete('/:id', deleteContact);

export default router;