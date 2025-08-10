import express from 'express';
import { register, login , forgotPassword , resetPassword } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);


export default router;
