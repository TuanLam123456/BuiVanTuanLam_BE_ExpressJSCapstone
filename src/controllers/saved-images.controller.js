import { savedImagesService } from "../services/saved-images.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const savedImagesController = {
  // Check if image is saved by Image Id
  async checkSavedStatus(req, res, next) {
    try {
      const result = await savedImagesService.checkSavedStatus(req);
      const response = responseSuccess(
        result,
        `Check save status for image #${req.params.hinhId} successfully`,
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  // Saved images list by User Id
  async getSavedImagesByUserId(req, res, next) {
    const result = await savedImagesService.getSavedImagesByUserId(req);
    const response = responseSuccess(
      result,
      `Get saved images list for user successfully`,
    );
    res.status(response.statusCode).json(response);
  },
};
