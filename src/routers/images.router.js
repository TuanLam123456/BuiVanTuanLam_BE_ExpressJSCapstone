import express from "express";
import { imagesController } from "../controllers/images.controller.js";
import { authCookie } from "./../common/middleware/authCookie.middleware.js";
import { uploadDiskStorage } from './../common/multer/disk-storage.multer.js';

const imagesRouter = express.Router();

// Tạo route CRUD
// Upload 1 file ảnh và lưu thông tin vào DB
imagesRouter.post("/", authCookie, uploadDiskStorage.single("hinh_anh"), imagesController.create);

// Find all images
imagesRouter.get("/", authCookie, imagesController.findAll);

// Find images by name
imagesRouter.get("/images-by-name", authCookie, imagesController.findByName);

// Created images list by users id
imagesRouter.get("/created-list", authCookie, imagesController.getCreatedImagesByUserId);

// Find image info and creator details by Image Id
imagesRouter.get("/:id",authCookie,imagesController.findOne)

// Xóa ảnh theo ID (Chỉ chính chủ mới được xóa)
imagesRouter.delete("/:id", authCookie, imagesController.remove);

export default imagesRouter;