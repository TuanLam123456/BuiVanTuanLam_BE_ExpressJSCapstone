import express from "express";
import { usersController } from "../controllers/users.controller.js";
import { uploadDiskStorage } from './../common/multer/disk-storage.multer.js';
import { authCookie } from './../common/middleware/authCookie.middleware.js';


const usersRouter = express.Router();

// Sử dụng Multer để bắt file ảnh đại diện gửi lên
usersRouter.put("/", authCookie, uploadDiskStorage.single("anh_dai_dien"), usersController.updateProfile);

export default usersRouter;