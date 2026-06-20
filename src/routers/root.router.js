import express from "express";
import testRouter from "./test.router.js";
import authRouter from './auth.router.js';

const rootRouter = express.Router();

// TEST (Không chính thức)
rootRouter.use("/test", testRouter);

// Official
rootRouter.use("/auth",authRouter)

export default rootRouter;
