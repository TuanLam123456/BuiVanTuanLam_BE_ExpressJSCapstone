import { prisma } from "../common/prisma/prisma.connect.js";
export const commentsService = {
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
};
