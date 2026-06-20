import express from "express";
import testRouter from "./test.router.js";
import authRouter from './auth.router.js';
import imagesRouter from "./images.router.js";

const rootRouter = express.Router();

// TEST (Không chính thức)
rootRouter.use("/test", testRouter);

// Official
// Auth
rootRouter.use("/auth",authRouter)
// Images
rootRouter.use("/images",imagesRouter)

export default rootRouter;
