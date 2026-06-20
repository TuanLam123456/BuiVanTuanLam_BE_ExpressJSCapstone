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

// Created images list by users id
imagesRouter.get("/created-list", authCookie, imagesController.getCreatedImagesByUserId);

// Find image info and creator details by Image Id
imagesRouter.get("/:id",authCookie,imagesController.findOne)

export default imagesRouter;