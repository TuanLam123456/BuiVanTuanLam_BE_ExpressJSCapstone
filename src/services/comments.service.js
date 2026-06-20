import { prisma } from "../common/prisma/prisma.connect.js";
export const commentsService = {
  // Find comments by image id
  async findByImageId(req) {
    const { hinhId } = req.params;
    const result = await prisma.binh_luan.findMany({
      where: {
        hinh_id: Number(hinhId),
      },
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            ho_ten: true,
            anh_dai_dien: true,
          },
        },
      },
      orderBy: {
        ngay_binh_luan: "desc",
      },
    });
    return result
  },
  // Comment images
  async create(req) {
    const nguoiDungId = req.user?.nguoi_dung_id; // Lấy từ middleware authCookie sau khi giải mã token
    const { hinh_id, noi_dung } = req.body;

    if (!nguoiDungId) {
      throw new Error("Unauthorized");
    }

    if (!hinh_id || !noi_dung) {
      throw new Error("Missing required fields: hinh_id or noi_dung");
    }

    // Tiến hành lưu vào bảng binh_luan
    const newComment = await prisma.binh_luan.create({
      data: {
        nguoi_dung_id: Number(nguoiDungId),
        hinh_id: Number(hinh_id),
        noi_dung: noi_dung,
        ngay_binh_luan: new Date(), // Tự động lấy mốc thời gian hiện tại
      },
      // Include luôn thông tin người dùng vừa comment để Frontend hiển thị ngay lập tức
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            ho_ten: true,
            anh_dai_dien: true,
          }
        }
      }
    });

    return newComment;
  },
};
