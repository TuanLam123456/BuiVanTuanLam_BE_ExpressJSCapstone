import express from "express";
import rootRouter from './src/routers/root.router.js';
import { appError } from './src/common/helpers/appError.helper.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json()); // middleware để parse body của request có định dạng json

app.use(cookieParser()) // middle
// định nghĩa api
app.use("/api", rootRouter);

// middleware nhận lỗi
app.use(appError)

const PORT = 3069;
app.listen(PORT, () => {
  console.log(`server online at port ${PORT}`);
});
