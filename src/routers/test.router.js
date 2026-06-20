import express from "express";
import { testController } from "../controllers/test.controller.js";
import { authCookie } from "../common/middleware/authCookie.middleware.js";

const testRouter = express.Router();

// Tạo route CRUD
testRouter.post("/", testController.create);
testRouter.get("/",authCookie, testController.findAll);
testRouter.get("/:id", testController.findOne);
testRouter.patch("/:id", testController.update);
testRouter.delete("/:id", testController.remove);

export default testRouter;
