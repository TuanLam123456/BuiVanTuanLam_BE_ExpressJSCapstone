import { responseSuccess } from "../common/helpers/response.helper.js";
import { imagesService } from "../services/images.service.js";

export const imagesController = {
  async create(req, res, next) {
    const result = await imagesService.create(req);
    const response = responseSuccess(result, `Create images successfully`);
    res.status(response.statusCode).json(response);
  },

  // Find all images
  async findAll(req, res, next) {
    const result = await imagesService.findAll(req);
    const response = responseSuccess(result, `Get all imagess successfully`);
    res.status(response.statusCode).json(response);
  },

  // Find images by name
  async findByName(req, res, next) {
    const result = await imagesService.findByName(req);
    // Lấy filter từ query string để đưa vào câu thông báo
    const filterText = req.query.filter || "";
    const response = responseSuccess(
      result,
      `Get images by filter ${filterText} successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  // Find image info and creator details by Image Id
  async findOne(req, res, next) {
    const result = await imagesService.findOne(req);
    const response = responseSuccess(
      result,
      `Get image #${req.params.id} with creator details successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  // Created images list by users id
  async getCreatedImagesByUserId(req, res, next) {
    const result = await imagesService.getCreatedImagesByUserId(req);
    const response = responseSuccess(
      result,
      `Get created images list for user successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async remove(req, res, next) {
    try {
      const result = await imagesService.remove(req);
      const response = responseSuccess(
        result,
        `Remove image #${req.params.id} successfully`,
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};
