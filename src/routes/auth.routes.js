import express from 'express'
import { register,login,logout,refreshTokens } from '../controllers/authController.js'
import { validate } from '../middleware/validateMiddleware.js';
import { registerSchema,loginSchema } from '../validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
router.post('/register',validate(registerSchema),register)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post('/login',validate(loginSchema),login)
/**
 * @swagger
 * /auth/logout:
 *  post:
 *      summary: Logout user and clear tokens
 *      tags: [Auth]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Logged out successfully
 *          401:
 *              description: Unauthorized 
 */
router.post('/logout',protect,logout)
/**
 * @swagger
 * /auth/refresh-tokens:
 *  post:
 *      summary: Refresh access token
 *      tags: [Auth]
 *      description: Uses the refresh token (usually stored in cookies) to generate a new access token
 *      responses:
 *          200:
 *              description: Tokens refreshed successfully
 *          401:
 *              description: Refresh tokens missing or expired
 */
router.post('/refresh-tokens',refreshTokens)


export default router;
