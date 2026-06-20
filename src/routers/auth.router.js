import express from 'express';
import { authController } from './../controllers/auth.controller.js';
import { authCookie } from './../common/middleware/authCookie.middleware.js';

const authRouter = express.Router();

// Tạo route CRUD
// Register
authRouter.post('/register', authController.register);
// Login
authRouter.post('/login', authController.login);
// Get User Info
authRouter.get('/get-user-info',authCookie,authController.getInfo)


export default authRouter;