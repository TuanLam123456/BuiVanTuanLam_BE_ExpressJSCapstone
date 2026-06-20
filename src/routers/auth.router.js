import express from 'express';
import { authController } from './../controllers/auth.controller.js';

const authRouter = express.Router();

// Tạo route CRUD
// Register
authRouter.post('/register', authController.register);
// Login
authRouter.post('/login', authController.login);


export default authRouter;