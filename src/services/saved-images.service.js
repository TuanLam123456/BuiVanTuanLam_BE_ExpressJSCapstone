import { prisma } from "../common/prisma/prisma.connect.js";

export const savedImagesService = {
  // Check if image is saved by Image Id
  async checkSavedStatus(req) {
    const { hinhId } = req.params;

    // Giả định middleware authCookie đã gán thông tin user đã giải mã vào req.user
    const nguoiDungId = req.user?.nguoi_dung_id;

    if (!nguoiDungId) {
      throw new Error("Unauthorized");
    }

    // Truy vấn cặp khóa chính kết hợp trong bảng luu_anh
    const savedRecord = await prisma.luu_anh.findUnique({
      where: {
        nguoi_dung_id_hinh_id: {
          nguoi_dung_id: Number(nguoiDungId),
          hinh_id: Number(hinhId),
        },
      },
    });

    // Định dạng lại ngày nếu có dữ liệu
    let formattedDate = null;
    if (savedRecord && savedRecord.ngay_luu) {
      const dateObj = new Date(savedRecord.ngay_luu);

      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Tháng trong JS chạy từ 0-11
      const year = dateObj.getFullYear();

      formattedDate = `${day}/${month}/${year}`; // Kết quả: DD/MM/YYYY
    }

    // Trả về kết quả dạng boolean để Frontend xử lý trạng thái nút Save dễ dàng
    return {
      isSaved: !!savedRecord, // true nếu đã lưu, false nếu chưa lưu
      ngay_luu: formattedDate,
    };
  },
};
