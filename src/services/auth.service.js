import { prisma } from "../common/prisma/prisma.connect.js";
import bcrypt from "bcrypt";
import { BadRequestError } from "./../common/helpers/exception.helper.js";
import { signAccessToken, signRefreshToken } from "../common/helpers/jwt.helper.js";
export const authService = {
  // Register
  async register(req) {
    const { email, password, fullName } = req.body;
    // console.log({ email, password, fullName });
    // kiểm tra email đã tồn tại chưa, nếu đã tồn tại thì trả về lỗi, nếu chưa tồn tại thì tạo mới user
    const existingUser = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });

    // bycrypt
    // brute force
    // Không thể dịch ngược
    // So sánh
    const hashPassword = bcrypt.hashSync(password, 10);

    // encrypt: MÃ HÓA
    // có thể dịch ngược để lấy dữ liệu

    if (existingUser) {
      throw new BadRequestError(`Email ${email} already exists`);
    }

    // Tạo người dùng mới
    const newUser = await prisma.nguoi_dung.create({
      data: {
        email: email,
        mat_khau: hashPassword,
        ho_ten: fullName,
      },
    });

    return newUser;
  },

  // Login
  async login(req) {
    const { email, password } = req.body;
    // console.log({ email, password });

    // Kiểm tra email có tồn tại hay không
    // Nếu chưa tồn tại thì trả về lỗi, kêu người dùng đăng ký
    // Nếu đã tồn tại thì so sánh password
    const existingUser = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
      omit: {
        mat_khau: false,
      },
    });

    if (!existingUser) {
      throw new BadRequestError(`Email ${email} does not exist, pls register`);
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.mat_khau);

    if (!isPasswordValid) {
      throw new BadRequestError(
        `Thông tin người dùng không đúng, vui lòng thử lại`,
      );
    }

    // Tạo access token
    // B1: tạo payload chứa thông tin: userId, email
    const payload = {
      userId: existingUser.id,
      email: existingUser.email,
    };
    // B2: tạo access token từ payload
    const accessToken = signAccessToken(payload);

    // tạo refresh token từ payload
    const refreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  },

  // Get User Info
  async getInfo(req){
    return req.user;
  }
};
