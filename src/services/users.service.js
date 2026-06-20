import { prisma } from "../common/prisma/prisma.connect.js";

export const usersService = {
  async updateProfile(req) {
    const nguoiDungId = req.user?.nguoi_dung_id;
    const file = req.file; // Lấy file từ Multer
    const { ho_ten, tuoi } = req.body;

    if (!nguoiDungId) {
      throw new Error("Unauthorized");
    }

    // Khởi tạo object data để update
    const updateData = {
      ho_ten: ho_ten,
      tuoi: tuoi ? Number(tuoi) : undefined,
    };

    // Nếu người dùng có upload file ảnh đại diện mới
    if (file) {
      updateData.anh_dai_dien = `http://localhost:3069/images/${file.filename}`;
    }

    // Tiến hành cập nhật database
    const updatedUser = await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: Number(nguoiDungId),
      },
      data: updateData,
      select: {
        nguoi_dung_id: true,
        email: true,
        ho_ten: true,
        tuoi: true,
        anh_dai_dien: true, // Trả ra đường dẫn ảnh mới để FE cập nhật giao diện
      },
    });

    return updatedUser;
  },
};