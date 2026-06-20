import express from 'express';
import { commentsController } from '../controllers/comments.controller.js';
import { authCookie } from './../common/middleware/authCookie.middleware.js';

const commentsRouter = express.Router();

// Tạo route CRUD

// Find comments by image id
commentsRouter.get('/by-image/:hinhId', commentsController.findByImageId);

// Comment images
commentsRouter.post('/', authCookie, commentsController.create);


export default commentsRouter;