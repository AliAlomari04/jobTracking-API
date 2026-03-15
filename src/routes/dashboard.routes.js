import express from 'express'
import { getDashboard } from "../controllers/getDashboardController.js";
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.use(protect);
/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get user dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved successfully (Job counts, upcoming interviews, recent activity)
 *       401:
 *         description: Unauthorized
 */
router.get('/',getDashboard)

export default router;