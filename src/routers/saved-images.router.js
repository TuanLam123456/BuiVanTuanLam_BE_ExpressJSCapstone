import express from "express";
import { savedImagesController } from "../controllers/saved-images.controller.js";
import { authCookie } from "../common/middleware/authCookie.middleware.js";

const savedImagesRouter = express.Router();

// Check if image is saved by Image Id
savedImagesRouter.get("/check/:hinhId", authCookie, savedImagesController.checkSavedStatus);

// Saved images list by User Id
savedImagesRouter.get("/list", authCookie, savedImagesController.getSavedImagesByUserId);

export default savedImagesRouter;