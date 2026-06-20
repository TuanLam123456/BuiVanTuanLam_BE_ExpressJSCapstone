import express from 'express';
import { imagesController } from '../controllers/images.controller.js';

const imagesRouter = express.Router();

// Tạo route CRUD
imagesRouter.post('/', imagesController.create);

// Find all images
imagesRouter.get('/', imagesController.findAll);

// Find images by name
imagesRouter.get('/images-by-name', imagesController.findByName);

imagesRouter.patch('/:id', imagesController.update);
imagesRouter.delete('/:id', imagesController.remove);

export default imagesRouter;