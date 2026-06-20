import express from "express";
import { imagesController } from "../controllers/images.controller.js";
import { authCookie } from "./../common/middleware/authCookie.middleware.js";

const imagesRouter = express.Router();

// Tạo route CRUD
imagesRouter.post("/", authCookie, imagesController.create);

// Find all images
imagesRouter.get("/", authCookie, imagesController.findAll);

// Find images by name
imagesRouter.get("/images-by-name", authCookie, imagesController.findByName);

// Find image info and creator details by Image Id
imagesRouter.get("/:id",authCookie,imagesController.findOne)

imagesRouter.patch("/:id", imagesController.update);
imagesRouter.delete("/:id", imagesController.remove);

export default imagesRouter;