import { buildQueryPrismaHelper } from "../common/helpers/build-query-prisma.helper.js";
import { prisma } from "../common/prisma/prisma.connect.js";

export const imagesService = {
  async create(req) {
    return `This action create`;
  },

  async findAll(req) {
    const { page, pageSize, index } = buildQueryPrismaHelper(req);

    const result = await prisma.hinh_anh.findMany({
      skip: index,
      take: pageSize,
    });

    const totalItems = await prisma.hinh_anh.count({});

    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      items: result,
      totalItems: totalItems,
      totalPages: totalPages,
      page: page,
      pageSize: pageSize,
    };
  },

  async findByName(req) {
    const { page, pageSize, index, where } = buildQueryPrismaHelper(req);

    const result = await prisma.hinh_anh.findMany({
      skip: index,
      take: pageSize,
      where: where,
    });

    const totalItems = await prisma.hinh_anh.count({
      where: where,
    });

    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      items: result,
      totalItems: totalItems,
      totalPages: totalPages,
      page: page,
      pageSize: pageSize,
    };
  },

  async findOne(req) {
    const { id } = req.params;
    const result = await prisma.hinh_anh.findUnique({
      where: {
        hinh_id: Number(id),
      },
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            email: true,
            ho_ten: true,
            anh_dai_dien: true,
          },
        },
      },
    });
    if (!result) {
      throw new Error(`Image with id ${id} not found`);
    }
    return result;
  },

  async update(req) {
    return `This action updates a id: ${req.params.id} images`;
  },

  async remove(req) {
    return `This action removes a id: ${req.params.id} images`;
  },
};
