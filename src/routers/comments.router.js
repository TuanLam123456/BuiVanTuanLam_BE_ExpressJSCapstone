import express from 'express';
import { commentsController } from '../controllers/comments.controller.js';

const commentsRouter = express.Router();

// Tạo route CRUD

// Find comments by image id
commentsRouter.get('/by-image/:hinhId', commentsController.findByImageId);


export default commentsRouter;