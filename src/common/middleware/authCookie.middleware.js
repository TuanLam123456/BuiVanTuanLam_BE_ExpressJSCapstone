import { authService } from "../../services/auth.service.js";
import { UnauthorizedError } from "../helpers/exception.helper.js";
import { verifyAccessToken } from "../helpers/jwt.helper.js";
import { prisma } from "../prisma/prisma.connect.js";
export const authCookie = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedError("Bạn chưa đăng nhập! Không tìm thấy token.");
    }

    const decodedUser = await verifyAccessToken(accessToken);

    const userExist = await prisma.nguoi_dung.findFirst({
      where: {
        email: decodedUser.email,
      },
    });
    if (!decodedUser) {
      throw new UnauthorizedError("Người dùng không tồn tại");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.statusCode) {
      return next(error);
    }

    const authError = new UnauthorizedError(
      error.message || "Xác thực token thất bại",
    );
    next(authError);
  }
};
